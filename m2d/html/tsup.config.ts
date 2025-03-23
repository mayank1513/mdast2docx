import { defineConfig, type Options } from "tsup";
import { rdiPlugin } from "esbuild-plugin-rdi";

export default defineConfig(
  (options: Options) =>
    ({
      format: ["cjs", "esm"],
      target: "es2019",
      entry: ["./src/**"],
      sourcemap: false,
      clean: !options.watch,
      bundle: true,
      minify: !options.watch,
      esbuildPlugins: [rdiPlugin()],
      ...options,
    }) as Options,
);
