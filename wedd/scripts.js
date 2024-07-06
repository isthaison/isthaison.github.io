window.scrollTo(0, 0);
let pixelsPerFrame = 5;

$(document).ready(function () {
  AOS.init();

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
      applyTypingEffect(document.body, 50);
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
      const targetPosition = element.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.75;
      if (targetPosition < window.scrollY) {
        window.scrollTo(0, targetPosition);
      } else {

      }


      window.requestAnimationFrame(function step(timestamp) {
        const currentY = window.scrollY;
        const nextY = currentY + pixelsPerFrame;

        if (nextY < targetPosition) {
          window.scrollTo(0, nextY);
          window.requestAnimationFrame(step);
        } else {
          callback();
        }
      });
    }

    function processNextNode(index) {
      if (index >= textNodes.length) {
        window.requestAnimationFrame(function step(timestamp) {
          let nextY = 1;

          if (nextY < 200) {
            next += 2;
            window.scrollTo(0, window.scrollY + 2);
            window.requestAnimationFrame(step);
          } else {
            window.scrollTo(0, 0);
          }
        });
        return;
      }
      const textNode = textNodes[index];
      const text = textNode.nodeValue;
      const parent = textNode.parentNode;

      if (parent) {
        parent.textContent = '';
        parent.style.visibility = 'visible';

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
