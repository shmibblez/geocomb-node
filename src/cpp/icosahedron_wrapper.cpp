#include "icosahedron_wrapper.hpp"
#include "point3.hpp"
#include <enums.hpp>
#include <napi.h>
#include <string>

void IcosahedronWrapper::Init(Napi::Env env, Napi::Object *exports) {
  Napi::Function func =
      DefineClass(env, "IcosahedronWrapper",
                  {
                      InstanceMethod("pointFromCoords",
                                     &IcosahedronWrapper::PointFromCoords),
                      InstanceMethod("hash", &IcosahedronWrapper::Hash),
                  });

  Napi::FunctionReference *constructor = new Napi::FunctionReference();
  *constructor = Napi::Persistent(func);
  env.SetInstanceData(constructor);

  exports->Set("IcosahedronWrapper", func);
}

IcosahedronWrapper::IcosahedronWrapper(const Napi::CallbackInfo &info)
    : Napi::ObjectWrap<IcosahedronWrapper>(info) {
  Napi::Env env = info.Env();

  std::string map_orientation_str = info[0].As<Napi::String>().Utf8Value();
  std::string rotation_method_str = info[1].As<Napi::String>().Utf8Value();

  std::unique_ptr<ico::map_orientation> map_orientation;
  std::unique_ptr<ico::rotation_method> rotation_method;

  if (map_orientation_str == "ECEF") {
    *map_orientation = ico::map_orientation::ECEF;
  } else if (map_orientation_str == "dymaxion") {
    *map_orientation = ico::map_orientation::dymaxion;
  } else {
    Napi::TypeError::New(
        env, "mapOrientation must be either \"ECEF\" or \"dymaxion\"")
        .ThrowAsJavaScriptException();
    return;
  }

  if (rotation_method_str == "gnomonic") {
    *rotation_method = ico::rotation_method::gnomonic;
  } else if (rotation_method_str == "quaternion") {
    *rotation_method = ico::rotation_method::quaternion;
  } else {
    Napi::TypeError::New(
        env, "rotationMethod must be either \"gnomonic\" or \"quaternion\"")
        .ThrowAsJavaScriptException();
    return;
  }

  this->icosahedron = &Icosahedron(*map_orientation, *rotation_method);
}

Napi::Value
IcosahedronWrapper::PointFromCoords(const Napi::CallbackInfo &info) {

  const double lat = info[0].As<Napi::Number>().DoubleValue();
  const double lon = info[1].As<Napi::Number>().DoubleValue();

  const Point3 p = this->icosahedron->point_from_coords(lat, lon);

  Napi::Env env = info.Env();
  Napi::Object obj = Napi::Object::New(env);
  obj.Set("x", p.x);
  obj.Set("y", p.y);
  obj.Set("z", p.z);
  obj.Set("triNum", p.tri_num);
  obj.Set("isPC", p.is_pc);

  return obj;
}

Napi::Value IcosahedronWrapper::Hash(const Napi::CallbackInfo &info) {
  const Napi::Object obj = info[0].As<Napi::Object>();
  const long double x = obj.Get("x").As<Napi::Number>().DoubleValue();
  const long double y = obj.Get("y").As<Napi::Number>().DoubleValue();
  const long double z = obj.Get("z").As<Napi::Number>().DoubleValue();

  Point3 p(x, y, z);
  const int res = info[1].As<Napi::Number>().Int32Value();

  Icosahedron::hash_properties props = this->icosahedron->hash(p, res);

  const Napi::Env env = info.Env();
  Napi::Object hash_props = Napi::Object::New(env);
  hash_props.Set("res", props.res);
  hash_props.Set("row", props.row);
  hash_props.Set("col", props.col);
  hash_props.Set("mo",
                 props.mo == ico::map_orientation::ECEF ? "ECEF" : "dymaxion");
  hash_props.Set("rm", props.rm == ico::rotation_method::gnomonic
                           ? "gnomonic"
                           : "quaternion");

  return hash_props;
}