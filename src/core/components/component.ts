import AbstractComponent from '~/core/models/abstract-component';
import type TagName from '~/core/models/tag-name.type';

export default class Component<T extends TagName = TagName> extends AbstractComponent<T> {}
