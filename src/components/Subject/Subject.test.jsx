import React from "react";
import { shallow } from "enzyme";
import ReactDOM from "react-dom";
import Subject from "./Subject";
import renderer from "react-test-renderer";

describe("<Subject />", () => {
  const wrapper = shallow(
    <Subject name="test" classroom="16" color="#000000" />
  );
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Subject name="test" classroom="16" color="#000000" />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it("Test block", () => {
    const component = renderer.create(
      <Subject name="Math" classroom="16" color="#FF9933" next />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Test now block", () => {
    const component = renderer.create(
      <Subject name="Math" classroom="16" color="#B036C3" now />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Test next block", () => {
    const component = renderer.create(
      <Subject name="Math" classroom="16" color="#FF9933" next />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
