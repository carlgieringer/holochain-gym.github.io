import"./70dd2230.js";import{h as e}from"./0fafd573.js";import{H as t,E as n,a as s,C as o,S as i,D as l,Z as a}from"./393087b4.js";import"./78a9ee0d.js";import"./962426a7.js";let r,d,m=e=>e;customElements.define("holochain-playground-container",t),customElements.define("entry-graph",n),customElements.define("entry-contents",s),customElements.define("call-zome-fns",o),customElements.define("source-chain",i),customElements.define("dht-cells",l),customElements.define("zome-fns-results",a);const c={name:"simulated-app",description:"",slots:{default:{dna:{zomes:[{name:"demo_entries",entry_defs:[{id:"demo_entry",visibility:"Public"}],validation_functions:{},zome_functions:{create_entry:{call:({create_entry:e})=>async({content:t})=>e({content:t,entry_def_id:"demo_entry"}),arguments:[{name:"content",type:"any"}]}}}]},deferred:!1}}},y=()=>e(r||(r=m`
    <holochain-playground-container
      .numberOfSimulatedConductors=${0}
      .simulatedHapp=${0}
    >
      <div
        style="display: flex; flex-direction: row; height: 400px; margin-bottom: 20px;"
      >
        <call-zome-fns
          id="call-zome"
          style="flex: 1; margin-right: 20px;"
          hide-zome-selector
        >
        </call-zome-fns>
        <dht-cells
          style="flex: 1"
          hide-filter
          hide-time-controller
          .workflowsToDisplay=${0}
          .networkRequestsToDisplay=${0}
        ></dht-cells>
      </div>
      <div
        style="display: flex; height: 450px; flex-direction: row; margin-bottom: 20px;"
      >
        <entry-graph
          style="flex: 1; margin-right: 20px;"
          .excludedEntryTypes=${0}
        >
        </entry-graph>
        <source-chain style="flex: 1; height: 100%; margin-right: 20px;">
        </source-chain>
      </div>
    </holochain-playground-container>
  `),4,c,[],[],["Agent"]),p={name:"simulated-app",description:"",slots:{default:{dna:{zomes:[{name:"demo_entries",entry_defs:[{id:"demo_entry",visibility:"Public"}],validation_functions:{},zome_functions:{create_entry:{call:({create_entry:e})=>async({content:t})=>e({content:t,entry_def_id:"demo_entry"}),arguments:[{name:"content",type:"any"}]},get:{call:({get:e})=>({hash:t})=>e(t),arguments:[{name:"hash",type:"AnyDhtHash"}]},get_details:{call:({get_details:e})=>({hash:t})=>e(t),arguments:[{name:"hash",type:"AnyDhtHash"}]}}}]},deferred:!1}}},h=()=>e(d||(d=m`
    <holochain-playground-container
      .numberOfSimulatedConductors=${0}
      .simulatedHapp=${0}
      @ready=${0}
    >
      <div
        style="display: flex; flex-direction: row; height: 500px; margin-bottom: 20px;"
      >
        <call-zome-fns
          id="call-zome"
          style="flex: 1; margin-right: 20px;"
          hide-zome-selector
          hide-agent-pub-key
        >
        </call-zome-fns>
        <zome-fns-results
          hide-agent-pub-key
          style="flex: 1;"
        ></zome-fns-results>
      </div>
      <div
        style="display: flex; flex-direction: row; height: 350px; margin-bottom: 20px;"
      >
        <entry-graph
          style="flex: 1; margin-right: 20px;"
          .excludedEntryTypes=${0}
          hide-filter
          show-headers
        >
        </entry-graph>
        <entry-contents style="flex-basis: 500px;"> </entry-contents>
      </div>
    </holochain-playground-container>
  `),1,p,(e=>{const t=e.detail.conductors[0].getAllCells()[0].cellId;e.target.activeAgentPubKey=t[1]}),["Agent"]),f=document,u=[{key:"Simple1",story:y},{key:"Simple2",story:h}];let g=!1;for(const e of u){const t=f.querySelector(`[mdjs-story-name="${e.key}"]`);t&&(t.story=e.story,t.key=e.key,g=!0,Object.assign(t,{}))}g&&(customElements.get("mdjs-preview")||import("./b257a137.js"),customElements.get("mdjs-story")||import("./e3dcbf2d.js"));export{y as Simple1,h as Simple2};