
import {
  withKnobs,
  text,
  boolean,
  number,
  array,
  select,
  object
} from "@storybook/addon-knobs";


export default{
  methods: {
      boolean:(x) => boolean(x),
      text:(x,y) => text(x,y),
      number: (x,y) => number(x,y),
      select: (x,y,z) => select(x,y,z),
      object: (x,y) => object(x,y)
  }
}
