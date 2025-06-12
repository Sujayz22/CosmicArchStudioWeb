import type { Schema, Struct } from '@strapi/strapi';

export interface ProjectKeyFeature extends Struct.ComponentSchema {
  collectionName: 'components_project_key_features';
  info: {
    displayName: 'key-feature';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'project.key-feature': ProjectKeyFeature;
    }
  }
}
