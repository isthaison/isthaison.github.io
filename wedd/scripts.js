$(document).ready(function () {

  var tdow = 5;

  function downtime() {
    if (tdow > 0) {
      window.scrollTo(0, 0);

      tdow--;
      setTimeout(() => {
        document.getElementById('downtime').innerText = tdow;

        downtime();
      }, 1200);
    } else {
      document.getElementById('downtime').style.display = 'none';
      applyTypingEffect(document.body, 200);
    }
  }
  downtime();
  function applyTypingEffect(element = document.createElement(), speed) {
    const textNodes = [];
    function typeWriterEffect(text, element = document.createElement(), speed, callback) {
      let i = 0;
      function type() {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
          setTimeout(type, speed);
        } else if (callback) {
          callback();
        }
      }
      type();
    }
    function getTextNodes(node = document.createElement()) {
      if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== '') {
        textNodes.push(node);
      } else {
        for (const childNode of node.childNodes) {
          getTextNodes(childNode);
        }
      }
    }
    function scrollToElement(element, callback) {
      const targetPosition = element.getBoundingClientRect().top + window.scrollY * 0.5;
      const pixelsPerFrame = 1;

      window.requestAnimationFrame(function step(timestamp) {
        const currentY = window.scrollY;
        const nextY = currentY + pixelsPerFrame;

        if (nextY < targetPosition) {
          window.scrollTo(0, nextY);
          window.requestAnimationFrame(step);
        } else {
          window.scrollTo(0, targetPosition);
          callback();
        }
      });
    }

    function processNextNode(index) {
      if (index >= textNodes.length) return;
      const textNode = textNodes[index];
      const text = textNode.nodeValue;
      const parent = textNode.parentNode;

      if (parent) {
        parent.textContent = '';
        parent.style.visibility = 'visible';
        console.log(text);
        scrollToElement(parent, function () {
          typeWriterEffect(text, parent, speed, function () {
            processNextNode(index + 1);
          });
        });
      }
    }
    getTextNodes(element);
    processNextNode(0);
  }
});
