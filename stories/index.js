import { storiesOf } from "@storybook/vue";
import "@appbaseio/vue-reactivesearch";

storiesOf("Test", module).add("Test Banner", () => ({
  template: `<FlockBanner>Welcome to vue js</FlockBanner>`
}));
