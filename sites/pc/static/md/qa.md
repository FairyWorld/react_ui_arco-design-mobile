# 常见问题

这里汇总了一些在使用组件库时常见的一些问题。

=====================

## Q: 引入了组件库包，但样式未引入或样式异常？

A: 本组件库的样式在 npm 包中的主要输出形式为`less`文件，请检查项目内的 less 环境是否正常（如使用 webpack 需配置 less-loader）以及`lessOptions`是否正确配置，详情可见快速上手中的“自适应适配”。

## Q: 引入了组件库包，但样式展示异常？

A: 本组件库使用`rem`做移动端自适应，需配合`flexible.js`来根据设备环境动态设置根元素的 font-size，详情可见快速上手中的“自适应适配”。

## Q: 是否支持在 SSR 环境下使用组件？

A: 本组件库中的组件均支持在 SSR 环境下使用，注意需使用`/cjs/`目录下的组件，而不是 /esm/ 目录。

## Q: 组件做自适应使用了 rem 单位，我想统一用 pxtovw 等插件来转换，能否禁用 rem ？

A: 可以，在 lessOptions 中更改`@use-rem`变量的值为`0`即可。

```js
// less options
lessOptions: {
    javascriptEnabled: true,
    modifyVars: {
        '@use-rem': 0,
    }
}
```

## Q: 使用 vite 编译时，引入组件库包后报错：'~@arco-design/mobile-utils/style/mixin.less' wasn't found.

A: 可参考[这里](https://github.com/vitejs/vite/issues/2185)的解决方案，修改 vite 配置：

```js
export default defineConfig({
    resolve: {
        alias: [
            { find: /^~/, replacement: '' }
        ],
    }
});
```

## Q: Popup Masking Dialog 等弹窗类组件，overflow 为 scroll 的元素内部不能滚动？

A: 在移动端调起弹窗时，会出现滚动穿透的问题，所以默认会为弹窗的 touchmove 事件做 preventDefault 操作来规避该问题。该操作也会阻止掉弹窗内容的滚动，因此需通过`getScrollContainer`属性手动指定下滚动容器做豁免，即判断从该属性传入的元素是否滚动到了边界位置，如果是则 preventDefault，否则不再阻止默认事件。

## Q: Popup ActionSheet 等弹窗类组件，`needBottomOffset`不生效？

A: `needBottomOffset`属性使用了`env(safe-area-inset-bottom)`作为底部边距值，请确认 html meta 中是否设置了`viewport-fit=cover`，如果没有设置，该属性将不起作用。

## Q: SSR 环境下使用部分组件报出 Warning: Prop \`className\` did not match 警告？

A: 部分组件在不同系统环境下会有不同表现，因此类名中可能会含有`android / ios`这类表示系统环境的值。这个值是通过 userAgent 来获取的，在 SSR 首屏渲染的时候拿不到 userAgent，所以此时该值为空字符串，与 CSR 阶段的值不一致。可以在 SSR 阶段以其他方式获取到当前系统环境值，并通过`ContextProvider`的`system`属性传入，如此可保证 SSR 与 CSR 阶段值一致。

```tsx
import { ContextProvider } from '@arco-design/mobile-react';

return ( <ContextProvider system="android">
    <Tabs ... />
</ContextProvider>)"
```

## Q: 用 Toast.toast 等方法调用组件时，接不到传给 ContextProvider 的配置？

A: 使用方法调用的组件不是页面根节点下的子组件，因此需将 ContextProvider 的配置传给方法，如：`Toast.toast({ content: 'Tips' }, { prefixCls: 'aa' })`。（`2.24.0`之后支持）

## Q: 使用 Input/Textarea/SearchBar 的 autoFocus 不生效

A: autoFocus 在一些机型上是不支持的，组件底层只能尝试 focus，但是到底能不能聚焦还得看机型

## Q: 使用或构建时出现 SyntaxError: xxx is undefined 的问题

A: @arco-design/mobile-react 包的版本需要和 @arco-design/mobile-utils 包的版本一一对应，可以查看项目中是否锁定或指定了 @arco-design/mobile-utils 包的版本。

## Q: Popup.open 里使用了 Provider 时报错或无法使用 context

A: XXX.open 之类的方法本质上都是通过创建 node 节点的方式去生成的，无法成为 provider 的子节点，如果是使用 arco-mobile 的 ContextProvider，可以把 ContextProvider 的配置作为 open 方法的第二个参数传递，如果是其他的 context 状态管理工具，需要在容器内的 children 节点再包一层工具的 provider，如果你的 provider 不方便给 children 节点包一层，可以使用 JSX 写法；

```tsx
// 使用 arco ContextProvider 时
import { ContextProvider, GlobalContext } from '@arco-design/mobile-react';

export const Demo1 = () => {
    return (
        <ContextProvider>
            <Cell
                onClick={() => {
                    window.modalInstance = Popup.open(
                        {
                            children: <Child />,
                        },
                        {
                            system: 'ios',
                        },
                    );
                }}
            />
        </ContextProvider>
    );
};

// 使用外部 context 时
const TestModel = createModel(() => {
    const [count, setCount] = useState(0);
    const add = (x: number) => setCount(count => count + x);
    return {
        count,
        add,
    };
});

export const Demo2 = () => {
    return (
        <TestModel.Provider>
            <Cell
                label="test"
                onClick={() => {
                    Popup.open({
                        children: (
                            <TestModel.Provider>
                                <Child />
                            </TestModel.Provider>
                        ),
                    });
                }}
            />
        </TestModel.Provider>
    );
};
```
