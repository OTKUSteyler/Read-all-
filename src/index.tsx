import { after } from "@vendetta/patcher";
import { findByProps } from "@vendetta/metro";

const Channels = findByProps("ChannelItem");

const patch = after("render", Channels, ([props], res) => {
  console.log("🔵 Injecting MarkAllReadButton...");
  res.props.children.push(<MarkAllReadButton />);
});

export default {
  onLoad: () => {
    console.log("✅ Plugin Loaded!");
    patch();
  },
  onUnload: () => patch?.(),
};
