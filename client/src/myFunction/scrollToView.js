export default function scrollToElement(Element) {
  Element.scrollIntoView({
    behavior: "smooth",
    block: "end",
  });
}
