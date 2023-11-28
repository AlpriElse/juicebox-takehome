import styled from "styled-components";

import * as Colors from "../constants/Colors";

const TYPE_TO_COLOR = {
  people: { background: Colors.LIMEWIRE, text: "black" },
  locations: { background: Colors.ROYAL_OCEAN, text: "white" },
  organizations: { background: Colors.CANADA_GREEN, text: "white" },
  time: { background: Colors.MILLENIAL_BREAKFAST, text: "white" },
};

const NamedEntityContainer = styled.span`
color: ${(props) => TYPE_TO_COLOR[props.type].text};
  background-color: ${(props) => TYPE_TO_COLOR[props.type].background};
  padding: 0.2em,
  padding-left: .5em,
  padding-right: .5em,
  border-radius: .25em,
`;

const NamedEntity = ({ type, content }) => {
  console.log(type);
  return (
    <NamedEntityContainer type={type}>
      <span
        style={{
          paddingRight: ".25em",
          borderRight: "1px solid white",
        }}
      >
        {type}
      </span>
      <span
        style={{
          paddingLeft: ".25em",
        }}
      >
        {content}
      </span>
    </NamedEntityContainer>
  );
};

export default NamedEntity;
