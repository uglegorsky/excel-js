import { $ } from '@core/DOM';

export function resizeHandler($root, event) {
  const $resizeElement = $(event.target);
  const $parent = $resizeElement.closest('[data-type="resizable"]');

  const coords = $parent.getCoords();

  // Get type (col || row) from dataset element
  const type = $resizeElement.data.resize;

  // Define side drawing of style line
  const sideProp = type === 'col' ? 'bottom' : 'right';

  // Value save size element after resize
  let size;

  // Set style line
  $resizeElement.css({
    opacity: 1,
    [sideProp]: '-5000px',
  });

  // On mousemove event draw line on table
  document.onmousemove = e => {
    if (type === 'col') {
      const delta = e.pageX - coords.right;
      size = coords.width + delta;
      $resizeElement.css({
        right: -delta + 'px',
      });
    } else {
      const delta = e.pageY - coords.bottom;
      size = coords.height + delta;
      $resizeElement.css({
        bottom: -delta + 'px',
      });
    }
  };

  // On mouseup reset style line & resize table elements
  document.onmouseup = () => {
    // Clear events
    document.onmousemove = null;
    document.onmouseup = null;

    // Resize table elements from conditions type
    if (type === 'col') {
      $parent.css({
        width: size + 'px',
      });

      $root.findAll(`[data-col="${$parent.data.col}"]`).forEach(el => {
        el.style.width = size + 'px';
      });
    } else {
      $parent.css({
        height: size + 'px',
      });
    }

    // Reset style line
    $resizeElement.css({
      opacity: 0,
      bottom: 0,
      right: 0,
    });
  };
}
