import type * as React from "react";
import type components from "./index.js";
import type { ComposaIconProps } from "./index.js";

export interface ComposaReactFactoryOptions {
  Icon?: React.ComponentType<ComposaIconProps>;
}

export declare function createComposaComponents(ReactRuntime: typeof React, options?: ComposaReactFactoryOptions): typeof components;
