# geocomb-node

welcome to geocomb-node, this project is a wrapper around geocomb-cpp so it can be used from node. It can convert locations to uniquiely identifiable hexagons for given resolutions, and vice versa.

## Update:
finally works (need to test on other machines though)

I will try to get this setup this week, some basic installation and usage docs, but will tidy up geocomb-cpp first




## TODO: 
in geocomb-cpp need to replace all
```for (const Triangle t : this->tris) {...}```
with 
```for (const Triangle &t : this->tris) {...}```
so don't copy tri objects, and need to clean up some other stuff too