import React from "react";

const App = (): JSX.Element => (
  <div>
    <h1 data-test-id="heading">
      Static Website with React
      <br />
      <small>Made easy with @mrgrain/cdk-esbuild</small>
      <hr />
      <small>Uptime monitored with Amazon CloudWatch Synthetics</small>
    </h1>
  </div>
);

export default App;
