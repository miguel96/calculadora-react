import * as React from "react";

interface ResultProps {
  value?: number;
  setValue: (newValue: number) => void;
}

const Result = ({ value, setValue }: ResultProps) => {
  return (
    <input
      type="text"
      className="result"
      value={value ?? ""}
      onChange={(e) => setValue(Number(e.target.value))}
    />
  );
};

interface OperationProps {
  value?: string;
}

const Operation = ({ value }: OperationProps) => {
  return (
    <div className="operation">
      <p>{value}</p>
    </div>
  );
};

const keys: {
  value: string;
  action?: "type" | "reset" | "calc";
  className?: string;
}[] = [
  { value: "C", action: "reset" },
  { value: "+-" },
  { value: "%" },
  { value: "+", className: "operations", action: "type" },
  { value: "1", action: "type" },
  { value: "2", action: "type" },
  { value: "3", action: "type" },
  { value: "-", className: "operations", action: "type" },
  { value: "4", action: "type" },
  { value: "5", action: "type" },
  { value: "6", action: "type" },
  { value: "x", className: "operations" },
  { value: "7", action: "type" },
  { value: "8", action: "type" },
  { value: "9", action: "type" },
  { value: "/", className: "operations" },
  { value: "0", action: "type" },
  { value: "." },
  { value: "=", className: "equal x2-width", action: "calc" },
];

interface CalculatorState {
  err?: Error;
  result?: number;
  operation: string;
  hasTyped: boolean;
}

type CalculatorAction =
  | { type: "reset" }
  | { type: "type"; value: string }
  | { type: "calc" };

const calculatorInitialState: CalculatorState = {
  operation: "",
  result: undefined,
  err: undefined,
  hasTyped: false,
};

const calculate = (operation: string): number => {
  const operations = operation.split(/(?=[+-])/);
  const resp = operations.reduce((result, el) => result + Number(el), 0);
  if (Number.isNaN(resp)) {
    throw new Error("invalid operation");
  }
  return resp;
};

const calculatorReducer = (
  state: CalculatorState,
  action: CalculatorAction
): CalculatorState => {
  const { type } = action;

  try {
    switch (type) {
      case "reset":
        return {
          ...calculatorInitialState,
        };
      case "type":
        if (!state.hasTyped && ["+", "-"].includes(action.value)) {
          return {
            result: undefined,
            operation: `${state.result}${action.value}`,
            hasTyped: true,
          };
        }

        return {
          result: undefined,
          operation: `${state.operation}${action.value}`,
          hasTyped: true,
        };
      case "calc":
        return {
          result: calculate(state.operation),
          operation: state.operation,
          hasTyped: false,
        };
      default:
        throw new Error("UNKNOWN_ACTION_TYPE");
    }
  } catch (err) {
    console.log("error", err);
    return { ...state, err: err as unknown as Error };
  }
};

const Calculator = () => {
  const [{ result, operation, err }, dispatch] = React.useReducer(
    calculatorReducer,
    calculatorInitialState
  );

  return (
    <div className="calculator">
      {err && <p>{err.message}</p>}
      <Operation value={operation} />
      <Result value={result} setValue={() => null} />
      <div>
        <ul className="keys">
          {keys.map((key) => (
            <li key={key.value} className={`key ${key.className || ""}`}>
              <button
                className={`button ${key.className || ""}`}
                onClick={() => {
                  if (key.action) {
                    dispatch({ type: key.action, value: key.value });
                  }
                }}
                type="button"
              >
                {key.value}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Calculator;
