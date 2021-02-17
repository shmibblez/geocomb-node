{
    "targets": [
        {
            "target_name": "geocomb",
            "sources": ["src/cpp/**", "src/cpp/geocomb/**"],
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
                    "-fexceptions",
                    "-std=c++17",
                    "-stdlib=libc++",
                ],
            },
            "include_dirs": [
                "<!@(node -p \"require('node-addon-api').include\")"
            ],
            # 'defines': ['NAPI_DISABLE_CPP_EXCEPTIONS'],
        }
    ]
}
