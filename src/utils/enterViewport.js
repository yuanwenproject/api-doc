import { useIntersectionObserver } from "@vueuse/core";
import store from "@/store/index";
const enterViewport = {
  bind(el, binding) {
    // console.log(el, binding, vnode);
    useIntersectionObserver(el, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        console.log(binding.value);
        store.dispatch("home/changeViewApiId", binding.value);
        // vnode.context.$data.requestFlag= isIntersecting
        // vnode.context.$data.$set(vnode.context.$data, 'requestFlag', isIntersecting);
      }
    });
  },
};

export default enterViewport;
