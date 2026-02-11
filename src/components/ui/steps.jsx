"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

// Step component
const Step = ({ title, description, icon, status, className, ...props }) => {
  return (
    <div
      className={cn(
        "flex items-start gap-3 relative",
        className
      )}
      {...props}
    >
      <div className="flex flex-col items-center flex-shrink-0 relative z-10">
        <div
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200",
            status === "finish" && "bg-red-800 text-white shadow-md",
            status === "process" && "bg-red-800 text-white ring-2 ring-red-200 ring-offset-2 shadow-md",
            status === "wait" && "bg-gray-200 text-gray-500",
            status === "error" && "bg-red-500 text-white",
            !status && "bg-gray-200 text-gray-500"
          )}
        >
          {status === "finish" ? (
            <Check className="w-5 h-5" />
          ) : icon ? (
            icon
          ) : null}
        </div>
      </div>
      <div className="flex-1 pb-8 min-w-0">
        <div
          className={cn(
            "text-sm font-semibold transition-colors",
            status === "finish" && "text-red-800",
            status === "process" && "text-red-800",
            status === "wait" && "text-gray-500",
            status === "error" && "text-red-500",
            !status && "text-gray-500"
          )}
        >
          {title}
        </div>
        {description && (
          <div className="text-xs text-gray-500 mt-1">{description}</div>
        )}
      </div>
    </div>
  );
};

// Steps component
export const Steps = ({ current = 0, direction = "horizontal", size = "default", children, className, ...props }) => {
  const steps = React.Children.toArray(children);
  const totalSteps = steps.length;

  return (
    <div
      className={cn(
        "w-full",
        direction === "horizontal" && "flex items-start",
        className
      )}
      {...props}
    >
      {steps.map((step, index) => {
        const stepProps = step.props || {};
        let status = stepProps.status;

        // Auto-determine status based on current
        if (!status) {
          if (index < current) {
            status = "finish";
          } else if (index === current) {
            status = "process";
          } else {
            status = "wait";
          }
        }

        const isLast = index === totalSteps - 1;

        return (
          <React.Fragment key={step.key || index}>
            <div
              className={cn(
                direction === "horizontal" ? "flex-1 flex items-start relative" : "w-full",
                direction === "horizontal" && !isLast && "pr-4"
              )}
            >
              <Step
                {...stepProps}
                status={status}
              />
              {!isLast && direction === "horizontal" && (
                <div
                  className={cn(
                    "absolute top-5 left-[calc(2.5rem+0.75rem)] right-0 h-0.5 transition-colors duration-200 z-0",
                    index < current ? "bg-red-800" : "bg-gray-200"
                  )}
                />
              )}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

Steps.Step = Step;

export default Steps;
