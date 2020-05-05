import * as React from 'react';
/* tslint import/no-webpack-loader-syntax: off */
/* tslint  no-undef: off */
// import { mxgraph } from 'mxgraph'; // Typings only - no code!

// declare var require: any;

//  const mx: typeof mxgraph = require('mxgraph')({
//    mxBasePath: 'mxgraph'
//  });

// import { mxEvent, mxGraph } from "script-loader!mxgraph/javascript/mxClient";
import styles from './SemTalkGraph.module.scss';
import { ISemTalkGraphProps } from './ISemTalkGraphProps';
// import { escape } from '@microsoft/sp-lodash-subset';
// import { GraphEditor } from "./MxGraphGridEditor";
import { MyEditor } from "./demo/my-editor";
//import { SideBar } from './demo/sidebar';
//import { ToolBar } from './demo/toolbar';
//import { Editor} from './src/editor';

export default class SemTalkGraph extends React.Component<ISemTalkGraphProps, {}> {
 // private graph: mxgraph.mxGraph;
  public render(): React.ReactElement<ISemTalkGraphProps> {
    let divHostStyle = {
      height: "600px", //this.props.height,
      width: "800px" //this.props.width
    };
    return (
      <div className={styles.semTalkGraph}>
      <div id='iframeHost' className={styles.iframeHost} style={divHostStyle}>
       {/* <GraphEditor/> */}
       <MyEditor/>
       </div>
      </div>
    );
  }
  constructor(props: ISemTalkGraphProps) {
    super(props);
    console.debug("showGraph");
    // this.callback = Guid.create();
    // this.LoadGraph = this
    //   .LoadGraph
    //   .bind(this);

    // this.state = {
    //   // filter: this.props.filter,
    //   objectid: -1,
    //   items: [],
    //   hasError: false
    // };
  }
  public componentDidMount() {
    // if (this.props.context && this.props.filter) {
    //   SetContext(this.props.context, this.props.filter, this.props.token);
    // }
    let x = require('./mxg.json');
     console.log(x);
  }
 /*  private LoadGraph(data) {
    // var container = findDOMNode(this.refs.divGraph);
    // var zoomPanel = ReactDOM.findDOMNode(this.refs.divZoom);

    // Checks if the browser is supported
    if (!mx.mxClient.isBrowserSupported()) {
      // Displays an error message if the browser is not supported.
      mx.mxUtils.error("Browser is not supported!", 200, false);
    } else {
      // Disables the built-in context menu
      var cnt = document.getElementById('some-empty-div-on-the-page');
      mx.mxEvent.disableContextMenu(cnt);

      // Creates the graph inside the given container
      if (cnt != null) {
        var graph = new mx.mxGraph(cnt);

        // Enables rubberband selection
        // new mxgraph.mxRubberband(graph);

        // Gets the default parent for inserting new cells. This is normally the first
        // child of the root (ie. layer 0).
        var parent = graph.getDefaultParent();
        // Enables tooltips, new connections and panning
        graph.setPanning(true);
        //graph.setTooltips(true); graph.setConnectable(true);
        graph.setEnabled(false);
        graph.setTooltips(true);
        graph.panningHandler.useLeftButtonForPanning = true;

        // Autosize labels on insert where autosize=1
        graph.autoSizeCellsOnAdd = true;

        // Allows moving of relative cells
        graph.isCellLocked = function (cell) {
          return this.isCellsLocked();
        };

        graph.isCellResizable = function (cell) {
          var geo = this
            .model
            .getGeometry(cell);

          return geo == null || !geo.relative;
        };

        // Truncates the label to the size of the vertex
        graph.getLabel = function (cell) {
          var label = this.labelsVisible
            ? this.convertValueToString(cell)
            : "";
          var geometry = this
            .model
            .getGeometry(cell);

          if (!this.model.isCollapsed(cell) && geometry != null && (geometry.offset == null ||
            (geometry.offset.x == 0 && geometry.offset.y == 0)) && this.model.isVertex(cell) && geometry.width >= 2) {
            var style = this.getCellStyle(cell);
            var fontSize = style[mx.mxConstants.STYLE_FONTSIZE] || mx.mxConstants.DEFAULT_FONTSIZE;
            var max = geometry.width / (fontSize * 0.625);

            if (max < label.length) {
              return label.substring(0, max) + "...";
            }
          }

          return label;
        };

        // Enables wrapping for vertex labels
        graph.isWrapping = function (cell) {
          return this
            .model
            .isCollapsed(cell);
        };

        // Enables clipping of vertex labels if no offset is defined
        graph.isLabelClipped = function (cell) {
          var geometry = this
            .model
            .getGeometry(cell);

          return (geometry != null && !geometry.relative && (geometry.offset == null || (geometry.offset.x == 0 && geometry.offset.y == 0)));
        };
        var layout = new mx.mxParallelEdgeLayout(graph);

        // Moves stuff wider apart than usual
        //layout.forceConstant = 140;
        //// Adds cells to the model in a single step
        graph
          .getModel()
          .beginUpdate();
        try {

          //mxGrapg componnent
          var doc = mx.mxUtils.createXmlDocument();
          var node = doc.createElement('YES');
          node.setAttribute('ComponentID', '[P01]');

          graph.insertVertex(graph.getDefaultParent(), null, node, 240, 40, 150, 30);

          var v1 = graph.insertVertex(parent, null, 'Example_Shape_01', 20, 120, 80, 30);
          var v2 = graph.insertVertex(parent, null, 'Example_Shape_02', 300, 120, 80, 30);
          var v3 = graph.insertVertex(parent, null, 'Example_Shape_03', 620, 180, 80, 30);
          // var e1 = graph.insertEdge(parent, null, 'Example Edge name_01', v1, v2);
          // var e2 = graph.insertEdge(parent, null, 'Example Edge name_02', v2, v3);
          // var e3 = graph.insertEdge(parent, null, 'Example Edge name_02', v1, v3);
          graph.insertEdge(parent, null, 'Example Edge name_01', v1, v2);
          graph.insertEdge(parent, null, 'Example Edge name_02', v2, v3);
          graph.insertEdge(parent, null, 'Example Edge name_02', v1, v3);


          // Gets the default parent for inserting new cells. This is normally the first
          // child of the root (ie. layer 0).
          parent = graph.getDefaultParent();

          // Executes the layout
          layout.execute(parent);
          //data
        } finally {
          // Updates the display
          graph
            .getModel()
            .endUpdate();
        }

        // Automatically handle parallel edges
        layout = new mx.mxParallelEdgeLayout(graph);
        // var layoutMgr = new mxgraph.mxLayoutManager(graph);

        // Enables rubberband (marquee) selection and a handler for basic keystrokes
        // var rubberband = new mxgraph.mxRubberband(graph);
        // var keyHandler = new mxgraph.mxKeyHandler(graph);
      }
    }
  }
  public componentDidMount() {
    // if (this.props.context && this.props.filter) {
    //   SetContext(this.props.context, this.props.filter, this.props.token);
    // }
    this.LoadGraph({});
    // var cnt = document.getElementById('some-empty-div-on-the-page');
    // if (cnt != null) {
    //   this.graph = new mx.mxGraph(cnt);
    //   const xml = "<?xml version='1.0' encoding='UTF-8'?><mxGraphModel><root><mxCell id='0'/>...</root></mxGraphModel>";

    //   let doc = mx.mxUtils.parseXml(xml);
    //   let codec = new mx.mxCodec(doc);
    //   codec.decode(doc.documentElement, this.graph.getModel());
    // }
  } */

}
