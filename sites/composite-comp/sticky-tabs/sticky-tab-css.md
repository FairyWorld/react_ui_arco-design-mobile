## 使用 position: sticky 替换 Sticky @en{Replace Sticky with position: sticky}

#### 3

当使用 sticky tabs 复合组件时，安卓机型经常会出现 tabBar 闪动的情况，可以通过 css 实现 sticky 的方式去优化性能<br/>
@en{When using the sticky tabs composite component, the tabBar will sometimes flash on the Android phone, and the performance can be optimized by using the css implementation of sticky}

注意：sticky css 属性兼容性有待考证；arco 已验证安卓5.1.1 vivoX7 支持；iPhone6plus ios 11.2.5不支持
@en{Note: the compatibility of the sticky css property is still under investigation; arco has verified that the Android 5.1.1 vivo X7 supports it; iPhone6plus ios 11.2.5 does not support it}

```js
import { Tabs, Sticky, Portal } from '@arco-design/mobile-react';

const tabData = [
    { title: 'Example 1' },
    { title: 'Example 2' },
    { title: 'Example 3' },
];

const getTopOffset = () => {
    return document.querySelector('.arcodesign-mobile-demo-nav-inner')?.getBoundingClientRect?.().bottom || 44
}

export default function StickyTabsCss() {
    const tabBarRef = React.useRef(null);
    const [topOffset, setTopOffset] = React.useState(44);

    const supportsCSS = (attribute, value) => {
        if (window && window.CSS) {
            if (typeof value === 'undefined') {
                return window.CSS.supports(attribute);
            }
            return window.CSS.supports(attribute, value);
        }

        const elem = document.createElement('div');
        if (attribute in elem.style) {
            elem.style[attribute] = value;
            return elem.style[attribute] === value;
        }
        return false;
    };

    React.useEffect(() => {
        setTopOffset(getTopOffset())
    }, [])

    return (
        <div id='sticky-tabs-wrapper-css'>
            <div className='placeholder'>
                placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder
            </div>
            <div className="sticky-tabs-wrapper-css-nav-bar" ref={tabBarRef} style={{top: topOffset}}/>
            <Tabs
                className='sticky-tabs'
                tabs={tabData}
                renderTabBar={(TabBar) =>
                    supportsCSS('position', 'sticky') ? (
                        <Portal getContainer={() => tabBarRef.current}>{TabBar}</Portal>
                    ) : (
                        <Sticky topOffset={topOffset}>{TabBar}</Sticky>
                    )}
            >
                <div className="demo-tab-content"> content 1</div>
                <div className="demo-tab-content"> content 2 </div>
                <div className="demo-tab-content"> content 3 </div>
            </Tabs>
        </div>
    );
}
```

```less
#sticky-tabs-wrapper-css {
    height: 500px;
    overflow: visible;

    .placeholder {
        color: #000;
        .rem(font-size, 20);
        .rem(height, 100);
    }

    .demo-tab-content {
        .rem(font-size, 20);
        .use-var(color, sub-info-font-color);
    }

    .sticky-tabs-wrapper-css-nav-bar {
        position: sticky;
        background: #fff;
        top: 44px;
    }
}
```
