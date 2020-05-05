import React from 'react';
// import PropTypes from 'prop-types';
// import { Collapse, Tooltip } from 'antd';
// import IMAGE_SHAPES from './shape-config/image-shape';
import { List, autobind } from 'office-ui-fabric-react';
import styles from './sidebar.module.scss';

const SIDEBAR_BASIC_SHAPES = [
  {
    name: 'rectangle',
    key: 'Rectangle',
    logo: 'https://img.alicdn.com/tfs/TB19O8OokvoK1RjSZFNXXcxMVXa-33-26.svg',
    width: 120,
    height: 60,
  },
  {
    name: 'rounded rectangle',
    key: 'Rounded Rectangle',
    logo: 'https://img.alicdn.com/tfs/TB1rzVHojDpK1RjSZFrXXa78VXa-33-26.svg',
    width: 120,
    height: 60,
  },
  {
    name: 'trapezoid',
    key: 'Trapezoid',
    logo: 'https://img.alicdn.com/tfs/TB1nEXPokvoK1RjSZPfXXXPKFXa-33-26.svg',
    width: 120,
    height: 60,
  },
  {
    name: 'circle',
    key: 'Circle',
    logo: 'https://img.alicdn.com/tfs/TB15iXQogHqK1RjSZFkXXX.WFXa-38-38.svg',
    width: 80,
    height: 80,
  },
  {
    name: 'triangle',
    key: 'Triangle',
    logo: 'https://img.alicdn.com/tfs/TB1cxNKohTpK1RjSZR0XXbEwXXa-38-38.svg',
    width: 80,
    height: 80,
  },
  {
    name: 'line',
    key: 'Line',
    logo: 'https://img.alicdn.com/tfs/TB1LOxPoirpK1RjSZFhXXXSdXXa-38-38.svg',
    width: 80,
    height: 80,
  },
  {
    name: 'text',
    key: 'Text',
    logo: '',
    width: 60,
    height: 20,
  }
];

const SIDEBAR_SVG_SHAPES = [{
  name: 'on-grid energy',
  key: 'shangwangdianliang',
  logo: 'https://img.alicdn.com/tfs/TB1i4I1wxTpK1RjSZR0XXbEwXXa-80-80.svg',
  width: 80,
  height: 80,
},
{
  name: 'electricity earnings',
  key: 'fadianshouyi',
  logo: 'https://img.alicdn.com/tfs/TB1MVA2wr2pK1RjSZFsXXaNlXXa-80-80.svg',
  width: 80,
  height: 80,
},
{
  name: 'monitor',
  key: 'gaojingjianshi',
  logo: 'https://img.alicdn.com/tfs/TB1DildwNYaK1RjSZFnXXa80pXa-80-80.svg',
  width: 80,
  height: 80,
}];

const SIDEBAR_CARD_SHAPES = [{
  name: 'primary equipment',
  key: 'zhushebei',
  logo: 'https://img.alicdn.com/tfs/TB1eD9LdgHqK1RjSZJnXXbNLpXa-144-128.png',
  width: 100,
  height: 80
}, {
  name: 'auxiliary equipment',
  key: 'fujiashebei',
  logo: 'https://img.alicdn.com/tfs/TB1ejUeiAPoK1RjSZKbXXX1IXXa-36-32.png',
  width: 100,
  height: 80
}, {
  name: 'product element',
  key: 'chanchuwu',
  logo: 'https://img.alicdn.com/tfs/TB1ht.aisbpK1RjSZFyXXX_qFXa-32-32.png',
  width: 100,
  height: 80
}];

export interface ISideBarProps {
  editor: any;
}
export interface ISideBarState {
  SIDEBAR_BASIC_SHAPES: any[];
  SIDEBAR_SVG_SHAPES: any[];
  SIDEBAR_CARD_SHAPES: any[];

}
export class Sidebar extends React.Component<ISideBarProps, ISideBarState> {
  constructor(props) {
    super(props);
    console.debug("SideBar");
    // SideBar.propTypes = {
    //   editor: PropTypes.object,
    // };

    // // Specifies the default values for props:
    // SideBar.defaultProps = {
    //   editor: {},
    // };
    this.state = {
      SIDEBAR_BASIC_SHAPES: SIDEBAR_BASIC_SHAPES,
      SIDEBAR_SVG_SHAPES: SIDEBAR_SVG_SHAPES,
      SIDEBAR_CARD_SHAPES: SIDEBAR_CARD_SHAPES
    };
  }

  public componentDidMount() {
    //  this.handleSidebarItems();
    this.onChange();
  }

  public componentDidUpdate() {
    this.handleSidebarItems();
  }

  private handleSidebarItems() {
    const { editor } = this.props;
    console.debug("handleSidebarItems1");

    if (editor && editor.initSidebar) {
      const sidebarItems = document.querySelectorAll('.' + styles.customsidebarnode);
      const len = sidebarItems.length;
      let newSidebarItems: any[] = [];
      for (let i = 0; i < len; i++) {
        let item = sidebarItems[i];
        if (!item.classList.contains('has-inited')) {
          item.classList.add('has-inited');
          newSidebarItems.push(item);
        }
      }
      //   const newSidebarItems = sidebarItems.filter((item) => {
      //   if (!item.classList.contains('has-inited')) {
      //     item.classList.add('has-inited');
      //     return true;
      //   }
      //   return false;
      // });

      editor.initSidebar(newSidebarItems);
    }
  }

  @autobind
  public onChange() {
    console.debug("handleSidebarItems");
    setTimeout(() => {
      this.handleSidebarItems();
    }, 1000);
  }
  private _onRenderCell(shape: any, index: number | undefined): JSX.Element {
    return (
      <div>
        <a
          href="javascript:void(0);"
          key={`panel_a_${shape.key}`}
          className={"geItem " + styles.customsidebarnode + " common-panel-node"}
          data-shape-type="general"
          data-shape-name={shape.key}
          data-shape-label={shape.name}
          data-shape-width={shape.width}
          data-shape-height={shape.height}
        >
          <div>
            {shape.logo ? <img className={styles.sidebarnodeimage} src={shape.logo} alt="" /> : shape.key}
            <span className={styles.sidebarnodelabel}>
              {shape.name}
            </span>
          </div>
        </a>
      </div>
    );
  }
  public render(): React.ReactElement<ISideBarProps> {
    return (<div className={"J_Sidebar_Container " + styles.sidebarcontainer}>
      <List items={this.state.SIDEBAR_BASIC_SHAPES}
        onRenderCell={this._onRenderCell} />
    </div>);

    /*       <div className={styles.sidebarcontainer}>
            <Stack
            // bordered={false}
            // defaultActiveKey={['common', 'svg', 'picture', 'card']}
            // onChange={() => {
            //   this.onChange();
            // }}
            >
              <Panel key="common" headerText="basic">
                <Stack>
                  {SIDEBAR_BASIC_SHAPES.map(shape => (
                    <a
                      href="javascript:void(0);"
                      key={`panel_a_${shape.key}`}
                      className={styles.customsidebarnode}>
                      data-shape-type="general"
                    data-shape-name={shape.key}
                    data-shape-label={shape.name}
                    data-shape-width={shape.width}
                    data-shape-height={shape.height}
                  >
                      <Tooltip
                      placement="top"
                      title={shape.name}
                      key={`panel_${shape.key}`}
                      className="tooltip"
                    >
                      {shape.logo ? <img className={styles.sidebarnodeimage} src={shape.logo} alt="" /> : shape.key}
                      <span className={styles.sidebarnodelabel}>
                        {shape.name}
                      </span>
                      </Tooltip>
                    </a>
                  ))}
                </Stack>
              </Panel>

              <Panel headerText="svg shapes" key="svg">
                <Stack>
                  {SIDEBAR_SVG_SHAPES.map(shape => (
                    <a
                      href="javascript:void(0);"
                      key={`panel_a_${shape.key}`}
                      className={styles.customsidebarnode}>
                      data-shape-type="svg"
                    data-shape-name={shape.key}
                    data-shape-label={shape.name}
                    data-shape-width={shape.width}
                    data-shape-height={shape.height}
                  >
                      <Tooltip
                      placement="top"
                      title={shape.name}
                      key={`panel_${shape.key}`}
                      className="tooltip"
                    >
                      <img className={styles.sidebarnodeimage} src={shape.logo} alt="" />
                      <span className={styles.sidebarnodelabel}>
                        {shape.name}
                      </span>
                     </Tooltip>
                    </a>
                  ))}
                </Stack>
              </Panel>
              <Panel headerText="images" key="picture">
                <Stack>
                  {IMAGE_SHAPES.map(shape => (
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        return false;
                      }}
                      key={`panel_a_${shape.key}`}
                      href="a"
                      className={styles.customsidebarnode}>
                      data-shape-type="image"
                    data-shape-width={shape.width}
                    data-shape-height={shape.height}
                    data-shape-name={shape.key}
                    data-shape-label={shape.name}
                    title={shape.name}
                  >
                       <Tooltip
                      placement="top"
                      title={shape.name}
                      key={`panel_${shape.key}`}
                      className="tooltip"
                    >
                      <img className={styles.sidebarnodeimage} src={shape.logo} alt="" />
                      <span className={styles.sidebarnodelabel}>
                        {shape.name}
                      </span>
                     </Tooltip>
                    </a>
                  ))}
                </Stack>
              </Panel>

              <Panel headerText="cards" key="card">
                <Stack>
                  {SIDEBAR_CARD_SHAPES.map(shape => (
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        return false;
                      }}
                      key={`panel_a_${shape.key}`}
                      href="a"
                      className={styles.customsidebarnode}>
                      data-shape-type="card"
                    data-shape-width={shape.width}
                    data-shape-height={shape.height}
                    data-shape-name={shape.key}
                    data-shape-label={shape.name}
                    title={shape.name}
                  >
                     <Tooltip
                        placement="top"
                        title={shape.name}
                        key={`panel_${shape.key}`}
                        className="tooltip"
                      >
                        <img className={styles.sidebarnodeimage} src={shape.logo} alt="" />
                        <span className={styles.sidebarnodelabel}>
                          {shape.name}
                        </span>
                       </Tooltip>

                    </a>
                  ))}
                </Stack>

              </Panel>

            </Stack>

          </div>
     */
  }
}

// SideBar.propTypes = {
//   editor: PropTypes.object,
// };

// // Specifies the default values for props:
// SideBar.defaultProps = {
//   editor: {},
// };
