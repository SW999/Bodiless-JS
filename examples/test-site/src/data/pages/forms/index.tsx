/**
 * Copyright © 2019 Johnson & Johnson
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
import React from 'react';
import { graphql } from 'gatsby';
import { Page } from '@bodiless/gatsby-theme-bodiless';
import { H1 } from '@bodiless/fclasses';
import ReactMarkdown from 'react-markdown';

import Layout from '../../../components/Layout';
import { asHeader1 } from '../../../components/Elements.token';

import asBodilessMarkdown from './asBodilessMarkdown';

const PageTitle = asHeader1(H1);

// const Markdown = asBodilessMarkdown('markdown', { source: 'Empty' })(ReactMarkdown);
const Markdown = asBodilessMarkdown('markdown')(ReactMarkdown);

export default (props: any) => (
  <Page {...props}>
    <Layout>
      <PageTitle>Forms</PageTitle>
      <Markdown />
    </Layout>
  </Page>
);

export const query = graphql`
  query($slug: String!) {
    ...PageQuery
    ...SiteQuery
  }
`;