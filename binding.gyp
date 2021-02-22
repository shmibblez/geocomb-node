{
    "targets": [
        {
            "target_name": "geocomb",
            # ["src/cpp/**", "src/cpp/geocomb/**"],
            "sources": ["src/cpp/addon.cpp",
                        "src/cpp/icosahedron.cpp",
                        "src/cpp/calc_percent.cpp",
                        "src/cpp/constants.cpp",
                        "src/cpp/phex.cpp",
                        "src/cpp/point3.cpp",
                        "src/cpp/triangle.cpp"],
            'include_dirs': ["<!@(node -p \"require('node-addon-api').include\")"],
            'dependencies': ["<!(node -p \"require('node-addon-api').gyp\")"],
            # "type": "executable",  # "static_library" | "executable" | "shared_library"
            "cflags!": [
                "-fexceptions",
                "-std=c++17",
                "-stdlib=libc++",
            ],
            "cflags_cc!": [
                "-fexceptions",
                "-std=c++17",
                "-stdlib=libc++",
            ],
            # doesn't build on macos witout this
            "xcode_settings": {
                "OTHER_CFLAGS": [
                    # "-fexceptions",
                    "-std=c++17",
                    "-stdlib=libc++",
                ],
                'GCC_ENABLE_CPP_EXCEPTIONS': 'YES',
                'CLANG_CXX_LIBRARY': 'libc++',
                'MACOSX_DEPLOYMENT_TARGET': '10.7'
            },
            'msvs_settings': {
                'VCCLCompilerTool': {'ExceptionHandling': 1},
            }
            # 'include_dirs': [
            #     "<!@(node -p \"require('node-addon-api').include\")"
            # ],
            # 'dependencies': [
            #     "<!(node -p \"require('node-addon-api').gyp\")"
            # ],
            # 'defines': ['NAPI_DISABLE_CPP_EXCEPTIONS']
            # "include_dirs": [
            #     "<!@(node -p \"require('node-addon-api').include\")"
            # ],
        }
    ]
}
