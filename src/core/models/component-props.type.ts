import type TagName from '~/core/models/tag-name.type';

type ComponentProps<T extends TagName> = Partial<HTMLElementTagNameMap[T]> | undefined;

export default ComponentProps;
