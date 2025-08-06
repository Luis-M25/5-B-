import { Module, Global } from '@nestjs/common';
import { DataPersistenceService } from '../../../shared/data-persistence.service';
import { join } from 'path';

@Global()
@Module({
  providers: [
    {
      provide: DataPersistenceService,
      useFactory: () => {
        const dataPath = join(__dirname, '../../../data.json');
        return new DataPersistenceService(dataPath);
      },
    },
  ],
  exports: [DataPersistenceService],
})
export class SharedModule {}
