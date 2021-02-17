# geocomb-node

welcome to geocomb-node, this project is a wrapper around geocomb-cpp so it can be used from node. It can convert lsocations to uniquiely identifiable hexagons for given resolutions, and vice versa.

## Note: 
geocomb-node (this library) is currently not working, keep getting `Error: Module did not self-register`. From the answers on [this stack overflow question](https://stackoverflow.com/questions/28486891/uncaught-error-module-did-not-self-register/49224357#49224357), it seems like a bunch of stuff could be going wrong so I'm going to take some time off, fix and clean up some things on my end, and hopefully get this baby up and running.

## project structure

- layers
  - there are a couple interaction layers between c++ and actual package:
  - first, the outermost one is Icosahedron class
  - the Icosahedron class calls Napi Icosahedron Wrapper
  - the Napi Icosahedron wrapper calls geocomb-cpp. It also translates received js variables so geocomb-cpp can understand them, and it translates the stuff geocomb-cpp returns so they can be used as js data types. Here will also need to translate RotationMethod and MapOrientation js strings to c++ enums.
- cpp
  - there is an Napi Icosahedron wrapper class (IcosahedronWrapper) that will interact with c++ (holds Icosahedron instance, calls its methods, etc), and with nodejs (javascript object)
  - need to create Napi wrappers for Points and Triangles? Gonna start without methods first, only to hold data
- geocomb-cpp code is gotten from [project github, main branch](https://github.com/shmibblez/geocomb-cpp), and is in .../src/cpp/geocomb/
- geocomb-cpp wrappers are in .../src/cpp/
# geocomb-node
