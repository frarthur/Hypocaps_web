import * as React from "react";
import classNames from "classnames";

import { mapStylesToClassNames as mapStyles } from "../../../utils/map-styles-to-class-names";
import type { BadgeProps } from "../../../types/stackbit";

export default function Badge(props: BadgeProps) {
  const { label, color = "text-primary", styles, className } = props;
  const fieldPath = props["data-sb-field-path"];
  if (!label) {
    return null;
  }

  return (
    <div
      className={classNames(
        "sb-component",
        "sb-component-block",
        "sb-component-badge",
        color,
        className,
        styles?.self ? mapStyles(styles?.self) : undefined
      )}
      data-sb-field-path={fieldPath}
    >
      <span
        className="tracking-wider uppercase"
        {...(fieldPath && { "data-sb-field-path": ".label" })}
      >
        {label}
      </span>
    </div>
  );
}
