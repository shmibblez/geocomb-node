#ifndef ICOSAHEDRON_WRAPPER
#define ICOSAHEDRON_WRAPPER

#include "icosahedron.hpp"
#include <napi.h>

class IcosahedronWrapper : public Napi::ObjectWrap<IcosahedronWrapper> {

public:
  Icosahedron *icosahedron;
  // TODO: need to cleanup in Napi object destruction callback

  static void Init(Napi::Env env, Napi::Object *exports);
  IcosahedronWrapper(const Napi::CallbackInfo &info);

private:
  /**
   * @returns Point3 object
   **/
  Napi::Value PointFromCoords(const Napi::CallbackInfo &info);
  /**
   * @returns HashProperties object
   **/
  Napi::Value Hash(const Napi::CallbackInfo &info);

  // TODO: need to make all_phexes too, but will require some more work,
  // implement later also, something useful: in cpp library, make phex have a
  // Phex::hash_properties, so you can get hash properties from phex
};

#endif