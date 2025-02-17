import React from 'react';
import { regGroupPanel } from '@capital/common';
import { Translate } from './translate';

const PLUGIN_NAME = 'com.msgbyte.webview';

const GroupWebPanelRender: React.FC<{ panelInfo: any }> = (props) => {
  const panelInfo = props.panelInfo;

  if (!panelInfo) {
    return <div>{Translate.notfound}</div>;
  }

  const url = panelInfo?.meta?.url;

  return (
    <iframe key={String(url)} className="w-full h-full bg-white" src={url} />
  );
};

regGroupPanel({
  name: `${PLUGIN_NAME}/grouppanel`,
  label: Translate.webpanel,
  provider: PLUGIN_NAME,
  extraFormMeta: [{ type: 'text', name: 'url', label: Translate.website }],
  render: GroupWebPanelRender,
});
