import { atomWithStorage } from "jotai/utils";
import { type WritableAtom, atom, useAtom, useAtomValue, useStore } from "jotai";
import {
    type ComponentProps,
    type FC,
    type PropsWithChildren,
    type ReactNode,
    Suspense, useEffect,
    useLayoutEffect,
    useMemo,
    useState,
} from "react";
import {
    Badge,
    Button,
    Card,
    Container,
    Flex,
    DataList,
    Code,
    Switch,
    type SwitchProps,
    Text,
    TextField,
    type TextProps,
} from "@radix-ui/themes";
import chalk from "chalk";
import extVerInfos from "./static/version.json";

const WARN_TAG = chalk.bgHex("#FF7700").hex("#FFFFFF")(" WARN ");
const INFO_TAG = chalk.bgHex("#00aaff").hex("#FFFFFF")(" INFO ");
const NAME_TAG = chalk.bgHex("#1ed760").hex("#FFFFFF")(" extSpotify ");

export function consoleLog(type: string, func: string, info: string) {

    if (type === "INFO") {
        console.log(NAME_TAG + INFO_TAG, func + "::" + info)

    } else if (type === "WARN") {
        console.log(NAME_TAG + WARN_TAG, func + "::" + info)

    } else if (type === "LOG") {
        console.log(NAME_TAG + NAME_TAG, func + "::" + info)

    } else {
        console.log(NAME_TAG + WARN_TAG, func + "::" + info)
    }

}

export const SettingPage: FC = () => {

    useEffect(() => {
        console.log("SettingPage Loaded");
    }, []);

    // 前置组件
    const SubTitle: FC<PropsWithChildren<TextProps>> = ({ children, ...props }) => {
        return (
            <Text weight="bold" size="4" my="4" as="div" {...props}>
                {children}
            </Text>
        );
    };

    // 检查更新信息
    const [Ver, setVer] = useState("unknown Ver");
    const [OnlineVer, setOnlineVer] = useState("unknown OnlineVer");
    const [Channel, setChannel] = useState("unknown Channel");
    const [MinApi, setMinApi] = useState("unknown MinApi");
    const [UpdTime, setUpdTime] = useState("unknown UpdTime");
    const [UpdSrc, setUpdSrc] = useState("unknown UpdSrc");
    const [updateAvailable, setUpdateAvailable] = useState(false);

    async function checkUpdate() {
        consoleLog("INFO", "settings", "检查更新中");
        setVer(extVerInfos.extVer);
        setChannel(extVerInfos.extChannel);
        setMinApi(extVerInfos.minApi);
        setUpdTime(extVerInfos.updTime);
        setUpdSrc(extVerInfos.updSrc);
        try {
            const updateInfosResponse = await fetch(
                "https://cdn.jsdelivr.net/gh/SteamFinder/AMLL-extAMLL-plugin/src/static/version.json",
                {
                    method: "GET",
                    cache: 'no-cache'
                },
            );
            if (updateInfosResponse.status === 200) {
                const updateInfos = await updateInfosResponse.json();
                if (updateInfos.verNum > extVerInfos.verNum) {
                    setUpdateAvailable(true);
                }
                setOnlineVer(updateInfos.extVer);
                consoleLog("INFO", "settings", "检查更新成功");
            } else {
                consoleLog("INFO", "settings", "检查更新失败");
            }
        } catch (error) {
            consoleLog("INFO", "settings", "检查更新失败");
        }
    }

    useEffect(() => {
        checkUpdate();
    }, []);

    // 设置AMLL Font Size
    const [amllFontSize, setAmllFontSize] = useAtom(amllFontSizeAtom);
    const [amllLightMode, setAmllLightMode] = useAtom(amllLightModeAtom);
    const [darkMode, setDarkMode] = useAtom(extensionContext.playerStates.darkModeAtom);
    const [autoDarkMode, setAutoDarkMode] = useAtom(extensionContext.playerStates.autoDarkModeAtom);

    function setAmllFontSizeFunc(setting: string) {

        // const lyricPlayerElement = getComputedStyle(document.querySelector(".amll-lyric-player"));
        // console.log(lyricPlayerElement.getPropertyValue('--amll-lp-font-size'));
        const lyricPlayerElement = document.querySelector(".amll-lyric-player") as HTMLElement;
        if (setting === "default") {
            consoleLog("INFO", "settings", "未设置amllFontSize " + setting);
            setAmllFontSize(setting);
            lyricPlayerElement.style.setProperty('--amll-lp-font-size', '');
        } else {
            consoleLog("INFO", "settings", "已设置amllFontSize " + setting);
            setAmllFontSize(setting);
            lyricPlayerElement.style.setProperty('--amll-lp-font-size', setting);
        }
    }

    // 设置AMLL Light Mode
    function setAmllLightModeFunc(mode: string) {
        if (mode === "1") {
            setAmllLightMode("1");
            setDarkMode("light");
            setAutoDarkMode(false);
            consoleLog("INFO", "settings", "已设置Light Mode");
        } else if (mode === "2") {
            setAmllLightMode("2");
            setDarkMode("dark");
            setAutoDarkMode(false);
            consoleLog("INFO", "settings", "已设置Dark Mode");
        } else {
            // 默认自动
            setAmllLightMode("0");
            setDarkMode("auto");
            setAutoDarkMode(true);
            consoleLog("INFO", "settings", "已设置Auto Mode");
        }
    }

    return (
        <>
            <SubTitle>extAMLL 设置</SubTitle>

            <Card mt="2">
                <DataList.Root>
                    <DataList.Item align="center">
                        <DataList.Label minWidth="88px">Channel</DataList.Label>
                        <DataList.Value>
                            <Badge color="jade" variant="soft" radius="full">
                                {Channel}
                            </Badge>
                        </DataList.Value>
                    </DataList.Item>
                    <DataList.Item>
                        <DataList.Label minWidth="88px">版本</DataList.Label>
                        <DataList.Value>
                            <Flex align="center" gap="2">
                                <Code variant="ghost">{Ver}</Code>
                            </Flex>
                        </DataList.Value>
                    </DataList.Item>
                    <DataList.Item>
                        <DataList.Label minWidth="88px">最新版本</DataList.Label>
                        <DataList.Value>
                            <Flex align="center" gap="2">
                                <Code variant="ghost">{OnlineVer}</Code>
                            </Flex>
                        </DataList.Value>
                    </DataList.Item>
                    <DataList.Item>
                        <DataList.Label minWidth="88px">TargetAPI</DataList.Label>
                        <DataList.Value>
                            <Flex align="center" gap="2">
                                <Code variant="ghost">{MinApi}</Code>
                            </Flex>
                        </DataList.Value>
                    </DataList.Item>
                    <DataList.Item>
                        <DataList.Label minWidth="88px">构建时间</DataList.Label>
                        <DataList.Value>
                            <Flex align="center" gap="2">
                                <Code variant="ghost">{UpdTime}</Code>
                            </Flex>
                        </DataList.Value>
                    </DataList.Item>
                    {updateAvailable && (
                        <DataList.Item>
                            <DataList.Label minWidth="88px">更新地址</DataList.Label>
                            <DataList.Value>
                                <Flex align="center" gap="2">
                                    <Code variant="ghost"><a href="{UpdSrc}" target="_blank">{UpdSrc}</a></Code>
                                </Flex>
                            </DataList.Value>
                        </DataList.Item>
                    )}
                </DataList.Root>
            </Card>

            <SubTitle>AMLL 增强设置</SubTitle>
            <Card mt="2">
                <Flex direction="row" align="center" gap="4" my="2">
                    <Flex direction="column" flexGrow="1">
                        <Text as="div">AMLL Font Size</Text>
                        <Text as="div" color="gray" size="2" >
                            输入default即恢复默认设置, 本设置等价于--amll-lp-font-size: 你的设置;
                        </Text>
                    </Flex>
                    <TextField.Root
                        value={amllFontSize}
                        onChange={(e) => setAmllFontSizeFunc(e.currentTarget.value)}
                    />
                </Flex>
            </Card>

            <Card mt="2">
                <Flex direction="row" align="center" gap="4" my="2">
                    <Flex direction="column" flexGrow="1">
                        <Text as="div">AMLL 显示模式</Text>
                        <Text as="div" color="gray" size="2" >
                            0: Auto, 1:Light, 2:Dark
                        </Text>
                    </Flex>
                    <TextField.Root
                        value={amllLightMode}
                        onChange={(e) => setAmllLightModeFunc(e.currentTarget.value)}
                    />
                </Flex>
            </Card>

            <Button m="2" onClick={() => window.open(UpdSrc)}>
                前往插件Release页面
            </Button>
        </>
    )
}

/**
 * AMLL Font Size
 */
export const amllFontSizeAtom = atomWithStorage(
    "amllFontSizeAtom",
    "default",
);

/**
 * AMLL Font Size
 */
export const amllLightModeAtom = atomWithStorage(
    "amllLightModeAtom",
    "0",
);