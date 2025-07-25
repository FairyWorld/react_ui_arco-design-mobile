### 反馈

# 消息通知 Notify

主动操作后显示的反馈信息横条，可采用方法调用或者组件调用的方式

======

> 属性/Props

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|className|自定义类名|string|-|
|style|自定义样式|CSSProperties|-|
|content|需要展示的内容|ReactNode|-|
|type|通知类型|"success" \| "error" \| "warn" \| "info"|"info"|
|visible|是否显示通知|boolean|false|
|close|控制通知关闭的事件|() =\> void|-|
|onClose|通知关闭时的回调函数|() =\> void|-|
|getContainer|将通知放入某个模块|() =\> HTMLElement|-|
|transitionDuration|动画的执行时间 (单位ms)|number|300|
|duration|通知自动关闭时延 (单位ms) 设置为0时不会自动关闭|number|3000|

> 引用/Refs

|参数|描述|类型|
|----------|-------------|------|
|dom|最外层dom元素|HTMLElement|
|updateLayout|更新元素布局|() =\> void|

> 方法/Methods

|方法名|描述|类型|
|----------|-------------|------|
|info|展示常规通知|(config: string \| NotifyProps) =\> \{ update: (config: NotifyProps) =\> void; close: () =\> void \}|
|success|展示成功通知|(config: string \| NotifyProps) =\> \{ update: (config: NotifyProps) =\> void; close: () =\> void \}|
|error|展示错误的通知|(config: string \| NotifyProps) =\> \{ update: (config: NotifyProps) =\> void; close: () =\> void \}|
|warn|展示警告的通知|(config: string \| NotifyProps) =\> \{ update: (config: NotifyProps) =\> void; close: () =\> void \}|

> NotifyType

```
"success" | "error" | "warn" | "info"
```

> GlobalContextParams

|参数|描述|类型|默认值|
|----------|-------------|------|------|
|prefixCls|组件类名前缀|string|"arco"|
|system|手动控制当前所在系统，传入后将直接使用传入的值，ssr场景需指定系统初始值时适用|"" \| "pc" \| "android" \| "ios"|""|
|useDarkMode|是否监听系统原生的暗黑模式变化(prefers\-color\-scheme: dark)以判断是否切为暗黑模式|boolean|false|
|isDarkMode|是否处于暗黑模式，指定后以指定的值为准|boolean|false|
|darkModeSelector|当处于暗黑模式时，body上挂载的类名，为空值时不挂载类名|string|"arco-theme-dark"|
|theme|主题变量，传入后将在线替换css变量，需设置less变量 @use\-css\-vars: 1|Record\<string, string\>|-|
|locale|国际化语言包配置|ILocale|-|
|useRtl|是否使用Rtl模式|boolean|false|
|onDarkModeChange|当系统原生暗黑模式发生变化时触发，useDarkMode=true 时有效|(isDark: boolean) =\> void|-|

> ILocale

|参数|描述|类型|
|----------|-------------|------|
|locale|语言类型|string|
|LoadMore|-|\{ loadMoreText: string; loadingText: string; noDataText: string; failLoadText: string; prepareScrollText: string; prepareClickText: string; \}|
|Picker|-|\{ okText: string; cancelText: string; \}|
|Tag|-|\{ addTag: string; \}|
|Dialog|-|\{ okText: string; cancelText: string; \}|
|SwipeLoad|-|\{ normalText: string; activeText: string; \}|
|PullRefresh|-|\{ loadingText: string; pullingText: string; finishText: string; loosingText: string; \}|
|DropdownMenu|-|\{ select: string; \}|
|Pagination|-|\{ previousPage: string; nextPage: string; \}|
|Image|-|\{ loadError: string; \}|
|ImagePicker|-|\{ loadError: string; \}|
|SearchBar|-|\{ placeholder: string; cancelBtn: string; \}|
|Stepper|-|\{ minusButtonName: string; addButtonName: string; \}|
|Keyboard|-|\{ confirm: string; \}|
|Form|-|\{ required: string; type: \{ email: string; url: string; string: string; number: string; array: string; object: string; boolean: string; \}; number: \{ min: string; max: string; equal: string; range: string; positive: string; negative: string; \}; \.\.\. 4 more \.\.\.; pickerDefaultHint: string; \}|
|NavBar|-|\{ backBtnAriaLabel: string; \}|
|Uploader|-|\{ uploadBtn: string; retryUpload: string; \}|
