import React from 'react';
// import { message, Layout } from 'antd';

import { Sidebar } from './sidebar';
import { Toolbar } from './toolbar';
import Editor from '../src/editor';

import IMAGE_SHAPES from './shape-config/image-shape';
import CARD_SHAPES from './shape-config/card-shape';
//import SVG_SHAPES from './shape-config/svg-shape.xml';

// let SVG_SHAPES = require('./shape-config/svg-shape.xml');

// import './my-editor.less';
import styles from './my-editor.module.scss';

// const { Sider, Content } = Layout;
export interface IMyEditorProps {
}
export interface IMyEditorState {
  editor: Editor | null;
}
export class MyEditor extends React.Component<IMyEditorProps, IMyEditorState> {
  // private editor: Editor;
  // private mounted: boolean=false;
  // private graphContainerClickCount: number=0;

  constructor(props: IMyEditorProps) {
    super(props);

    console.debug("MyEditor");
    this.state = {
      editor: null
    };

    // this.graphContainerClickCount = 0;
  }

  public componentDidMount() {
    // this.mounted = true;
    //    let IMAGE_SHAPES;
    //    let CARD_SHAPES;
    let SVG_SHAPES;

    const editor = new Editor({
      container: 'some-empty-div-on-the-page',
      clickFunc: this.clickFunc,
      doubleClickFunc: this.doubleClickFunc,
      autoSaveFunc: this.autoSaveFunc,
      cellCreatedFunc: this.cellCreatedFunc,
      deleteFunc: this.deleteFunc,
      undoFunc: this.undoFunc,
      copyFunc: this.copyFunc,
      valueChangeFunc: this.valueChangeFunc,
      IMAGE_SHAPES,
      CARD_SHAPES,
      SVG_SHAPES
    }); //
    editor.graph.minimumContainerSize={ width: 500, height: 500};
    editor.graph.sizeDidChange();
    // this.editor = editor;

    (window as any).editor = editor;

    editor.initCustomPort('https://gw.alicdn.com/tfs/TB1PqwZzzDpK1RjSZFrXXa78VXa-200-200.png');

    const xml = window.localStorage.getItem('autosaveXml');

    editor.renderGraphFromXml(xml);

    this.setState({ editor: editor });
  }

  public componentWillUnmount() {
    // this.mounted = false;

    // remove event listeners when component will unmount
    if (this.state.editor != null) {
      this.state.editor.removeEventListeners();
    }
  }


  /**
   * double click event callback
   */
  public doubleClickFunc = (cell) => {
    console.log('double click', cell);
  }

  public cellCreatedFunc = (currentCell) => {
    if (this.state.editor != null) {
      const allCells = this.state.editor.getAllCells();

      let sameShapeNameCount = 0;
      const { shapeName } = currentCell;

      allCells
        && Object.keys(allCells).forEach((index) => {
          if (allCells[index].shapeName === shapeName) {
            sameShapeNameCount += 1;
          }
        });

      const labelName = currentCell.value;

      this.state.editor.renameCell(`${labelName}${sameShapeNameCount}`, currentCell);
    }
  }
  public deleteFunc = (cells) => {
    console.log('cells deleted: ', cells);
  }

  /**
   * value change callback
   * @param {*} cell cell
   * @param {*} newValue new value
   */
  public valueChangeFunc = (cell, newValue) => {
    console.log(`new value: ${newValue}`);
  }

  public autoSaveFunc = (xml) => {
    (window as any).autosaveXml = xml;

    const oParser = new DOMParser(); // eslint-disable-line
    const oDOM = oParser.parseFromString(xml, 'application/xml');

    (window as any).autoSaveXmlDom = oDOM;

    (window as any).localStorage.setItem('autosaveXml', xml);
  }

  public clickFunc = (cell) => {
    console.log('click', cell);
  }

  public undoFunc = (histories) => {
    console.log('undo', histories);
  }

  public copyFunc = (cells) => {
    console.log('copy', cells);
  }

  public updateDiagramData = (data) => {
    console.log(`update diagram: ${data}`);

    alert('diagram save success');
  }

  public render() {
    const { editor } = this.state;

    return (
      <div className={styles.editorcontainer}>
        <div className={styles.row} >
          <div className={styles.column} >
            {editor &&
              <Toolbar
                editor={editor}
                updateDiagramData={this.updateDiagramData}
              />
            }
          </div>
        </div>
        <div className={styles.row} >
          <div className={styles.column} >
            {editor &&
              <Sidebar key="sidebar" editor={editor} />
            }
          </div>
          <div className={styles.column} >
            <div className={styles.graphinnercontainer}>
              <div id='some-empty-div-on-the-page' className={styles.graphcontent} key="graphcontent" />
            </div>
          </div>
        </div>
      </div>

      /*        <div className="editor-container">
              <Layout>
                <Sider width="235" theme="light">
                  <Sidebar key="sidebar" editor={editor} />
                </Sider>
                <Content>
                  <div className={styles.graphinnercontainer}>
                    {editor ? (
                      <Toolbar
                        editor={editor}
                        updateDiagramData={this.updateDiagramData}
                      />
                    ) : null}
                    <div some-empty-div-on-the-page' className={styles.graphcontent} key="graphcontent" />
                  </div>
                </Content>
              </Layout>
            </div> */
    );
  }
}

export default MyEditor;
