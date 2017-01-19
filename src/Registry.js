import {
  getId
} from './helper';
class Registry extends Array {

  id = getId();

  insert(table, record) {
    const id = getId(table, table),updatedRecord= Object.assign(record, {id});
    this.push(updatedRecord);
    return updatedRecord;
  }

  find(table, where = ((record, i) => true)) {
    if (arguments.length === 1)
      return this.filter((record) => Registry.isBelongsTo(record, table));
    else
      return this.filter((record, i) => Registry.isBelongsTo(record, table) && where(record, i));
  }

  remove(table, where) {

    if (arguments.length === 1)
      this.removeIf((record) => Registry.isBelongsTo(record, table))
    else
      this.removeIf((record, i) => Registry.isBelongsTo(record, table) && where(record, i))
  }

  removeIf(callback) {
    let i = this.length;
    while (i--) {
      if (callback(this[i], i)) {
        this.splice(i, 1);
      }
    }
  }



  static isBelongsTo(record, table) {
    return record.id.startsWith(table) && record.id.endsWith(table);
  }

}
export default Registry;
