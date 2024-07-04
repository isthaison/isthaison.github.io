

$(document).ready(function () {



    document.addEventListener('keypress', function (event) {
        // Kiểm tra nếu phím được nhấn là phím Enter và có focus vào một phần tử cụ thể
        if (event.key === 'Enter') {
            // Thực hiện hành động tương ứng ở đây
            applyTypingEffect(document.body, 5);
        }
    });


    function autoScrollToEnd(node = document.createElement("p")) {

        function scrollStep() {

            window.scrollTo(0, window.scrollY + 1);

            if (window.scrollY < node.getBoundingClientRect().top + node.clientHeight + window.innerHeight * .5) {
                setTimeout(() => {
                    requestAnimationFrame(scrollStep)

                }, 0);
            } else {
                return true
            }
        }

        scrollStep();
    }


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

    function applyTypingEffect(element = document.createElement(), speed) {
        const textNodes = [];

        function getTextNodes(node = document.createElement()) {
            if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== '') {
                textNodes.push(node);
            } else {
                for (const childNode of node.childNodes) {
                    getTextNodes(childNode);
                }
            }
        }
        function processNextNode(index) {
            if (index >= textNodes.length) return;
            const textNode = textNodes[index];
            const text = textNode.nodeValue;
            const parent = textNode.parentNode;
            //parent.replaceChild(tempSpan, textNode);

            if (parent) {
                while (autoScrollToEnd(parent)) {

                }
                parent.textContent = "";
                parent.style.visibility = 'visible';
                typeWriterEffect(text, parent, speed, () => {

                    processNextNode(index + 1);
                });
            }



        }
        getTextNodes(element);

        processNextNode(0);
    }

});


