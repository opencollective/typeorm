import {TargetMetadataCollection} from "./TargetMetadataCollection";
import {PropertyMetadata} from "../PropertyMetadata";

export class PropertyMetadataCollection<T extends PropertyMetadata> extends TargetMetadataCollection<T>  {

    filterRepeatedMetadatas(existsMetadatas: T[]): this {
        const collection = new (<any> this.constructor)();
        this
            .filter(metadata => {
                return !existsMetadatas.find(fieldFromDocument => fieldFromDocument.propertyName === metadata.propertyName);
            })
            .forEach(metadata => collection.add(metadata));
        
        return collection;
    }

}