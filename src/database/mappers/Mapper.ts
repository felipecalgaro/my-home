export interface Mapper<DatabaseEntity, DomainEntity> {
  toDomain(entity: DatabaseEntity): DomainEntity;
  toDatabase(entity: DomainEntity): DatabaseEntity;
}
