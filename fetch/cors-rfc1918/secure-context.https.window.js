// META: script=resources/support.js
//
// Spec: https://wicg.github.io/cors-rfc1918/#integration-fetch
//
// This file covers only those tests that must execute in a secure context.
// Other tests are defined in: non-secure-context.window.js

setup(() => {
  // Making sure we are in a secure context, as expected.
  assert_true(window.isSecureContext);
});

// For the following tests, we go through an iframe, because it is not possible
// to directly import the test harness from a secured public page.
promise_test(async t => {
  let iframe = await appendIframe(t, document,
      "resources/treat-as-public-address.https.html");
  let reply = futureMessage();
  iframe.contentWindow.postMessage("local", "*");
  assert_equals(await reply, "success");
}, "Public secure page fetches local page.");

promise_test(async t => {
  let iframe = await appendIframe(t, document,
      "resources/treat-as-public-address.https.html");
  let reply = futureMessage();
  iframe.contentWindow.postMessage("public-non-secure", "*");
  assert_equals(await reply, "failure");
}, "Public secure page fetches public non secure page.");

promise_test(async t => {
  let iframe = await appendIframe(t, document,
      "resources/treat-as-public-address.https.html");
  let reply = futureMessage();
  iframe.contentWindow.postMessage("public-secure", "*");
  assert_equals(await reply, "success");
}, "Public secure page fetches public secure page.");

