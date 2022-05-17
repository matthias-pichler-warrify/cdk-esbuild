import assert from "assert";
import synthetics from "Synthetics";
import "pptr-testing-library/extend";
import { queries } from "pptr-testing-library";

export const handler = async () => {
  const page = await synthetics.getPage();
  const $document = await page.getDocument();
  const $heading = await queries.getByTestId($document, "heading");

  assert((await $heading.getNodeText()).includes("Static Website with React"));

  return;
};
