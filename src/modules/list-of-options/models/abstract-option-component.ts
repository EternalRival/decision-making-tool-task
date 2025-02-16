import AbstractComponent from '~/core/models/abstract-component';
import type TagName from '~/core/models/tag-name.type';
import type OptionDTO from '~/core/models/option.dto';

export default abstract class AbstractOptionComponent<T extends TagName = TagName>
  extends AbstractComponent<T>
  implements OptionDTO
{
  public abstract id: string;

  public abstract title: string;

  public abstract weight: string;
}
