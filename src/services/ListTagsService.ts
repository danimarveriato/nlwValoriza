import { getCustomRepository } from "typeorm"
import { TagsRepositories } from "../repositories/TagsRepositories"
import { classToPlain } from "class-transformer";

class ListTagsService {
    async execute() {
        const tagsRepositories = getCustomRepository(TagsRepositories);

        const tags = await tagsRepositories.find();

        //Customizando a exibição da tag
        // "..." Recupera todas as informações dentro do objeto
        // let tags = await tagsRepositories.find();
        // tags = tags.map((tag) => ({ ...tag, nameCustom: `#${tag.name}` }));

        //classe classToPlain vai na entidade de tag e cria novos objetos a partir dos objetos já criados
        return classToPlain(tags);
    }
}

export { ListTagsService }