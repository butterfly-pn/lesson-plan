import React from "react";
import ReactDOM from "react-dom";
import Day from "./Day";
import renderer from "react-test-renderer";

describe("<Day />", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Day subjects={[{ name: "Math", classroom: "16" }]} />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it("Snapshot", () => {
    const component = renderer.create(
      <Day subjects={[{ name: "Math", classroom: "16" }]} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
