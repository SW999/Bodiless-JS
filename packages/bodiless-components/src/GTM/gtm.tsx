/**
 * Copyright © 2020 Johnson & Johnson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { ComponentType as CT, PropsWithChildren } from 'react';
import { stripIndent } from 'common-tags';
import { FieldProps } from 'informed';
import { HelmetProps } from 'react-helmet';
import * as _ from 'lodash';
import { withHeadElement } from '../Meta/Meta';

// type GtmEventData = {
//   content: string;
// };
//
// type GtmDefaultPageData = {
//   event: string;
//   page: object;
// };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const generateDataLayer = (dataLayer: any, dataLayerName: string) => {
  let result = `window.${dataLayerName} = window.${dataLayerName} || [];`;

  if (dataLayer !== undefined) {
    result += `window.${dataLayerName}.push(${JSON.stringify(dataLayer)});`;
  }

  return stripIndent`${result}`;
};

type BaseProps = PropsWithChildren<HelmetProps>;
type Data = {
  content: string;
};
export type DataLayer = {
  dataLayerName: string
  data?: any,
};

type Props = BaseProps & Data & DataLayer;

type BasicOptions = {
  name: string;
};

type Options = {
  label: string;
  path: string;
  useFormElement?: () => CT<FieldProps<any, any>>,
  placeholder?: string;
} & BasicOptions;

const withDataLayer$ = (options: Options) => (
  HelmetComponent: CT<BaseProps>,
) => (props : Props) => {
  // @ts-ignore
  const {
    dataLayerName, data, children, content, ...rest
  } = props;
  const { path } = options;
  console.log('props', props);
  console.log('options', options);
  _.set(data, path, content);
  console.log('content', content);
  return (
    <HelmetComponent {...rest}>
      {children}
      <script>
        {generateDataLayer(data, dataLayerName)}
      </script>
    </HelmetComponent>
  );
};

const withDataLayer = withHeadElement(withDataLayer$);

/**
 * HOC that adds Default Datalayer to a Component
 * @param propsToAdd
 */
export const withDefaultDataLayer = (dataLayer: DataLayer) => (
  (HelmetComponent: CT<BaseProps>) => (
    (props: Props) => (<HelmetComponent {...dataLayer} {...props} />)
  )
);
export default withDataLayer;
