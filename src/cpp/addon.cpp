#include "icosahedron_wrapper.hpp"
#include <napi.h>

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  IcosahedronWrapper::Init(env, exports);
  return exports;
};

NODE_API_MODULE(geocomb, Init);
