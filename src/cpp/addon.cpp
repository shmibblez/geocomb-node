#include "icosahedron.hpp"
#include <napi.h>

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  Icosahedron::Init(env, &exports);
  return exports;
};

NODE_API_MODULE(addon, Init)