import {
  type ComponentProps,
  Fragment,
  type HTMLAttributes,
  type ReactNode,
  useMemo,
} from "react";
import {
  type BaseLayoutProps,
  BaseLinkItem,
  type BaseLinkType,
  getLinks,
  type LinkItemType,
} from "../shared/index";
import {
  Sidebar,
  SidebarCollapseTrigger,
  type SidebarComponents,
  SidebarContent,
  SidebarContentMobile,
  SidebarFolder,
  SidebarFolderContent,
  SidebarFolderLink,
  SidebarFolderTrigger,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarPageTree,
  type SidebarProps,
  SidebarTrigger,
  SidebarViewport,
} from "../../sidebar";
import { TreeContextProvider } from "fumadocs-ui/contexts/tree";
import { cn } from "../../../lib/cn";
import { buttonVariants } from "../../ui/button";
import {
  ChevronDown,
  Languages,
  Sidebar as SidebarIcon,
  X,
} from "lucide-react";
import { LanguageToggle } from "../../language-toggle";
import { ThemeToggle } from "../../theme-toggle";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import type { PageTree } from "fumadocs-core/server";
import { LayoutBody, LayoutTabs, Navbar, NavbarSidebarTrigger } from "./client";
import { NavProvider } from "fumadocs-ui/contexts/layout";
import { type Option, RootToggle } from "../../root-toggle";
import Link from "fumadocs-core/link";
import { LargeSearchToggle, SearchToggle } from "../../search-toggle";
import { HideIfEmpty } from "fumadocs-core/hide-if-empty";
import {
  getSidebarTabs,
  type GetSidebarTabsOptions,
} from "fumadocs-ui/utils/get-sidebar-tabs";

export interface DocsLayoutProps extends BaseLayoutProps {
  tree: PageTree.Root;
  tabMode?: "sidebar" | "navbar";

  nav?: BaseLayoutProps["nav"] & {
    mode?: "top" | "auto";
  };

  sidebar?: SidebarOptions;

  containerProps?: HTMLAttributes<HTMLDivElement>;
}

interface SidebarOptions
  extends ComponentProps<"aside">,
    Pick<SidebarProps, "defaultOpenLevel" | "prefetch"> {
  components?: Partial<SidebarComponents>;

  /**
   * Root Toggle options
   */
  tabs?: Option[] | GetSidebarTabsOptions | false;

  banner?: ReactNode;
  footer?: ReactNode;

  /**
   * Support collapsing the sidebar on desktop mode
   *
   * @defaultValue true
   */
  collapsible?: boolean;
}

export function DocsLayout(props: DocsLayoutProps) {
  const {
    tabMode = "sidebar",
    nav: { transparentMode, ...nav } = {},
    sidebar: { tabs: tabOptions, ...sidebarProps } = {},
    i18n = false,
    disableThemeSwitch = false,
    themeSwitch = { enabled: !disableThemeSwitch },
  } = props;

  const navMode = nav.mode ?? "auto";
  const links = getLinks(props.links ?? [], props.githubUrl);
  const tabs = useMemo(() => {
    if (Array.isArray(tabOptions)) {
      return tabOptions;
    }

    if (typeof tabOptions === "object") {
      return getSidebarTabs(props.tree, tabOptions);
    }

    if (tabOptions !== false) {
      return getSidebarTabs(props.tree);
    }

    return [];
  }, [tabOptions, props.tree]);

  function sidebar() {
    const {
      banner,
      footer,
      components,
      collapsible = true,
      prefetch,
      defaultOpenLevel,
      ...rest
    } = sidebarProps;
    const iconLinks = links.filter((item) => item.type === "icon");

    const rootToggle = (
      <>
        {tabMode === "sidebar" && tabs.length > 0 && (
          <RootToggle className="mb-2" options={tabs} />
        )}
        {tabMode === "navbar" && tabs.length > 0 && (
          <RootToggle options={tabs} className="lg:hidden" />
        )}
      </>
    );

    const sidebarNav = (
      <div className="flex justify-between">
        <Link
          href={nav.url ?? "/"}
          className="inline-flex items-center gap-2.5 font-medium"
        >
          {nav.title}
        </Link>
        {collapsible && (
          <SidebarCollapseTrigger
            className={cn(
              buttonVariants({
                color: "ghost",
                size: "icon-sm",
                className: "text-fd-muted-foreground mt-px mb-auto",
              }),
            )}
          >
            <SidebarIcon />
          </SidebarCollapseTrigger>
        )}
      </div>
    );

    const viewport = (
      <SidebarViewport>
        {links
          .filter((item) => item.type !== "icon")
          .map((item, i, arr) => (
            <SidebarLinkItem
              key={i}
              item={item}
              className={cn("lg:hidden", i === arr.length - 1 && "mb-4")}
            />
          ))}

        <SidebarPageTree components={components} />
      </SidebarViewport>
    );

    const content = (
      <SidebarContent
        {...rest}
        className={cn(
          navMode === "top"
            ? "border-e-0 bg-transparent"
            : "[--fd-nav-height:0px]",
          rest.className,
        )}
      >
        <HideIfEmpty as={SidebarHeader}>
          {navMode === "auto" && sidebarNav}
          {nav.children}
          {banner}
          {rootToggle}
        </HideIfEmpty>
        {viewport}
        <HideIfEmpty
          as={SidebarFooter}
          className="text-fd-muted-foreground flex flex-row items-center"
        >
          {iconLinks.map((item, i) => (
            <BaseLinkItem
              key={i}
              item={item}
              className={cn(
                buttonVariants({
                  size: "icon-sm",
                  color: "ghost",
                  className: "lg:hidden",
                }),
              )}
              aria-label={item.label}
            >
              {item.icon}
            </BaseLinkItem>
          ))}
          {footer}
        </HideIfEmpty>
      </SidebarContent>
    );

    const mobile = (
      <SidebarContentMobile {...rest}>
        <SidebarHeader>
          <SidebarTrigger
            className={cn(
              buttonVariants({
                size: "icon-sm",
                color: "ghost",
                className: "text-fd-muted-foreground ms-auto",
              }),
            )}
          >
            <X />
          </SidebarTrigger>
          {banner}
          {rootToggle}
        </SidebarHeader>
        {viewport}
        <HideIfEmpty
          as={SidebarFooter}
          className="flex flex-row items-center justify-end"
        >
          {iconLinks.map((item, i) => (
            <BaseLinkItem
              key={i}
              item={item}
              className={cn(
                buttonVariants({
                  size: "icon-sm",
                  color: "ghost",
                }),
                "text-fd-muted-foreground lg:hidden",
                i === iconLinks.length - 1 && "me-auto",
              )}
              aria-label={item.label}
            >
              {item.icon}
            </BaseLinkItem>
          ))}
          {i18n ? (
            <LanguageToggle>
              <Languages className="text-fd-muted-foreground size-4.5" />
            </LanguageToggle>
          ) : null}
          {themeSwitch.enabled !== false &&
            (themeSwitch.component ?? (
              <ThemeToggle mode={themeSwitch.mode ?? "light-dark-system"} />
            ))}
          {footer}
        </HideIfEmpty>
      </SidebarContentMobile>
    );

    return (
      <Sidebar
        defaultOpenLevel={defaultOpenLevel}
        prefetch={prefetch}
        Content={content}
        Mobile={mobile}
      />
    );
  }

  return (
    <TreeContextProvider tree={props.tree}>
      <NavProvider transparentMode={transparentMode}>
        <LayoutBody
          {...props.containerProps}
          className={cn(
            "md:[--fd-sidebar-width:286px] xl:[--fd-toc-width:286px]",
            props.containerProps?.className,
          )}
        >
          {sidebar()}
          <DocsNavbar
            {...props}
            links={links}
            tabs={tabMode == "navbar" ? tabs : []}
          />
          {props.children}
        </LayoutBody>
      </NavProvider>
    </TreeContextProvider>
  );
}

function DocsNavbar({
  links,
  tabs,
  searchToggle = {},
  themeSwitch = {},
  nav = {},
  ...props
}: DocsLayoutProps & {
  links: LinkItemType[];
  tabs: Option[];
}) {
  const navMode = nav.mode ?? "auto";
  const sidebarCollapsible = props.sidebar?.collapsible ?? true;

  return (
    <Navbar
      mode={navMode}
      className={cn(
        "on-root:[--fd-nav-height:56px] md:on-root:[--fd-nav-height:64px]",
        tabs.length > 0 && "lg:on-root:[--fd-nav-height:104px]",
      )}
    >
      <div
        className={cn(
          "flex flex-1 gap-2 border-b px-4 md:px-6",
          navMode === "top" && "ps-7",
        )}
      >
        <div
          className={cn(
            "items-center",
            navMode === "top" && "flex flex-1",
            navMode === "auto" && [
              "hidden max-md:flex",
              sidebarCollapsible && "has-data-[collapsed=true]:md:flex",
            ],
          )}
        >
          {sidebarCollapsible && navMode === "auto" && (
            <SidebarCollapseTrigger
              className={cn(
                buttonVariants({
                  color: "ghost",
                  size: "icon-sm",
                }),
                "text-fd-muted-foreground data-[collapsed=false]:hidden max-md:hidden",
              )}
            >
              <SidebarIcon />
            </SidebarCollapseTrigger>
          )}
          <Link
            href={nav.url ?? "/"}
            className={cn(
              "inline-flex items-center gap-2.5 font-semibold",
              navMode === "auto" && "md:hidden",
            )}
          >
            {nav.title}
          </Link>
        </div>
        {searchToggle.enabled !== false &&
          (searchToggle.components?.lg ? (
            <div
              className={cn(
                "my-auto w-full max-md:hidden",
                navMode === "top" ? "max-w-sm rounded-xl" : "max-w-[240px]",
              )}
            >
              {searchToggle.components.lg}
            </div>
          ) : (
            <LargeSearchToggle
              hideIfDisabled
              className={cn(
                "my-auto w-full max-md:hidden",
                navMode === "top"
                  ? "max-w-sm rounded-xl ps-2.5"
                  : "max-w-[240px]",
              )}
            />
          ))}
        <div className="flex flex-1 items-center justify-end md:gap-2">
          <div className="flex items-center gap-6 empty:hidden max-lg:hidden">
            {links
              .filter((item) => item.type !== "icon")
              .map((item, i) => (
                <NavbarLinkItem
                  key={i}
                  item={item}
                  className="text-fd-muted-foreground hover:text-fd-accent-foreground data-[active=true]:text-fd-primary text-sm transition-colors"
                />
              ))}
          </div>
          {nav.children}
          {links
            .filter((item) => item.type === "icon")
            .map((item, i) => (
              <BaseLinkItem
                key={i}
                item={item}
                className={cn(
                  buttonVariants({ size: "icon-sm", color: "ghost" }),
                  "text-fd-muted-foreground max-lg:hidden",
                )}
                aria-label={item.label}
              >
                {item.icon}
              </BaseLinkItem>
            ))}

          <div className="flex items-center md:hidden">
            {searchToggle.enabled !== false &&
              (searchToggle.components?.sm ?? (
                <SearchToggle hideIfDisabled className="p-2" />
              ))}
            <NavbarSidebarTrigger className="-me-1.5 p-2" />
          </div>

          <div className="flex items-center gap-2 max-md:hidden">
            {props.i18n ? (
              <LanguageToggle>
                <Languages className="text-fd-muted-foreground size-4.5" />
              </LanguageToggle>
            ) : null}
            {themeSwitch.enabled !== false &&
              (themeSwitch.component ?? (
                <ThemeToggle mode={themeSwitch.mode ?? "light-dark-system"} />
              ))}
            {sidebarCollapsible && navMode === "top" && (
              <SidebarCollapseTrigger
                className={cn(
                  buttonVariants({
                    color: "secondary",
                    size: "icon-sm",
                  }),
                  "text-fd-muted-foreground -me-1.5 rounded-full",
                )}
              >
                <SidebarIcon />
              </SidebarCollapseTrigger>
            )}
          </div>
        </div>
      </div>
      {tabs.length > 0 && (
        <LayoutTabs
          className={cn(
            "h-10 border-b px-6 max-lg:hidden",
            navMode === "top" && "ps-7",
          )}
          options={tabs}
        />
      )}
    </Navbar>
  );
}

function NavbarLinkItem({
  item,
  ...props
}: { item: LinkItemType } & HTMLAttributes<HTMLElement>) {
  if (item.type === "menu") {
    return (
      <Popover>
        <PopoverTrigger
          {...props}
          className={cn(
            "has-data-[active=true]:text-fd-primary inline-flex items-center gap-1.5",
            props.className,
          )}
        >
          {item.url ? (
            <BaseLinkItem item={item as BaseLinkType}>{item.text}</BaseLinkItem>
          ) : (
            item.text
          )}
          <ChevronDown className="size-3" />
        </PopoverTrigger>
        <PopoverContent className="flex flex-col">
          {item.items.map((child, i) => {
            if (child.type === "custom")
              return <Fragment key={i}>{child.children}</Fragment>;

            return (
              <BaseLinkItem
                key={i}
                item={child}
                className="hover:bg-fd-accent hover:text-fd-accent-foreground data-[active=true]:text-fd-primary inline-flex items-center gap-2 rounded-md p-2 text-start [&_svg]:size-4"
              >
                {child.icon}
                {child.text}
              </BaseLinkItem>
            );
          })}
        </PopoverContent>
      </Popover>
    );
  }

  if (item.type === "custom") return item.children;

  return (
    <BaseLinkItem item={item} {...props}>
      {item.text}
    </BaseLinkItem>
  );
}

function SidebarLinkItem({
  item,
  ...props
}: {
  item: Exclude<LinkItemType, { type: "icon" }>;
  className?: string;
}) {
  if (item.type === "menu")
    return (
      <SidebarFolder {...props}>
        {item.url ? (
          <SidebarFolderLink href={item.url} external={item.external}>
            {item.icon}
            {item.text}
          </SidebarFolderLink>
        ) : (
          <SidebarFolderTrigger>
            {item.icon}
            {item.text}
          </SidebarFolderTrigger>
        )}
        <SidebarFolderContent>
          {item.items.map((child, i) => (
            <SidebarLinkItem key={i} item={child} />
          ))}
        </SidebarFolderContent>
      </SidebarFolder>
    );

  if (item.type === "custom") return <div {...props}>{item.children}</div>;

  return (
    <SidebarItem
      href={item.url}
      icon={item.icon}
      external={item.external}
      {...props}
    >
      {item.text}
    </SidebarItem>
  );
}

export { Navbar, NavbarSidebarTrigger };
