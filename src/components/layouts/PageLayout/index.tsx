import * as React from 'react';

import { getBaseLayoutComponent } from '../../../utils/base-layout';
import { getComponent } from '../../components-registry';
import type { LayoutProps } from '../../../types/stackbit';

function BaseLayoutRenderer({ page, site, children, ...rest }: LayoutProps) {
    const Layout = getBaseLayoutComponent(page.baseLayout, site.baseLayout);
    return React.createElement(Layout, { page, site, ...rest }, children);
}

export default function PageLayout(props: LayoutProps) {
    const { page, site } = props;
    const { enableAnnotations = true } = site;
    const { title, sections = [] } = page;

    return (
        <BaseLayoutRenderer page={page} site={site}>
            <main id="main" className="sb-layout sb-page-layout">
                {title && (
                    <h1 className="sr-only" {...(enableAnnotations && { 'data-sb-field-path': 'title' })}>
                        {title}
                    </h1>
                )}
                {sections.length > 0 && (
                    <div {...(enableAnnotations && { 'data-sb-field-path': 'sections' })}>
                        {sections.map((section: any, index: number) => {
                            const Component = getComponent(section.__metadata.modelName);
                            if (!Component) {
                                throw new Error(`no component matching the page section's model name: ${section.__metadata.modelName}`);
                            }
                            return React.createElement(Component, {
                                key: index,
                                ...section,
                                enableAnnotations,
                                ...(enableAnnotations && { 'data-sb-field-path': `sections.${index}` })
                            });
                        })}
                    </div>
                )}
            </main>
        </BaseLayoutRenderer>
    );
}
