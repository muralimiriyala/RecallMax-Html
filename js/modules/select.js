import $ from 'jquery';
import 'selectbox';

const selectBox = {
  $select: document.querySelectorAll('select'),
  init() {
    const _ = this;
    _.$select.forEach((ele) => {
      let select = $(ele);
      select.selectbox({});
    });
  },
};
export default selectBox;
