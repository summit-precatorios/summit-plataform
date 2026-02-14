import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  AlertCircle,
  File as FileIcon,
  Info,
  Upload,
  X,
} from 'lucide-react';

type DocumentsSectionProps = {
  uploadedFiles: File[];
  fileErrors: string[];
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeFile: (index: number) => void;
  formatFileSize: (size: number) => string;
};

export function DocumentsSection({
  uploadedFiles,
  fileErrors,
  handleFileUpload,
  removeFile,
  formatFileSize,
}: DocumentsSectionProps) {
  return (
    <Card className='border-2 shadow-lg'>
      <CardHeader>
        <div className='flex items-center gap-3'>
          <div className='p-2 rounded-lg bg-purple-100'>
            <FileIcon className='h-5 w-5 text-purple-600' />
          </div>
          <div>
            <CardTitle className='text-xl'>Documentos (Opcional)</CardTitle>
            <CardDescription>
              Anexe documentos relacionados ao seu precatório (procuração,
              processos, etc.)
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className='grid gap-6 pt-6'>
        <div className='space-y-4'>
          <div className='border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-brand transition-colors'>
            <div className='flex flex-col items-center justify-center text-center'>
              <div className='p-3 rounded-full bg-brand/10 mb-3'>
                <Upload className='h-8 w-8 text-brand' />
              </div>
              <Label
                htmlFor='file-upload'
                className='cursor-pointer flex flex-col items-center gap-2'
              >
                <span className='text-base font-semibold text-gray-900'>
                  Clique para fazer upload ou arraste os arquivos aqui
                </span>
                <span className='text-sm text-gray-500'>
                  Apenas arquivos PDF (máximo 10MB por arquivo)
                </span>
              </Label>
              <Input
                id='file-upload'
                type='file'
                accept='.pdf,application/pdf'
                multiple
                className='hidden'
                onChange={handleFileUpload}
              />
            </div>
          </div>

          {fileErrors.length > 0 && (
            <Card className='border-red-200 bg-red-50'>
              <CardContent className='pt-6'>
                <div className='flex items-start gap-3'>
                  <AlertCircle className='h-5 w-5 text-red-600 mt-0.5 flex-shrink-0' />
                  <div className='flex-1'>
                    <p className='text-sm font-medium text-red-900 mb-2'>
                      Erros ao adicionar arquivos:
                    </p>
                    <ul className='text-sm text-red-700 space-y-1'>
                      {fileErrors.map((error, index) => (
                        <li key={index}>• {error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {uploadedFiles.length > 0 && (
            <div className='space-y-3'>
              <div className='flex items-center justify-between'>
                <p className='text-sm font-medium text-gray-900'>
                  Arquivos selecionados ({uploadedFiles.length})
                </p>
              </div>
              <div className='space-y-2'>
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className='flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200'
                  >
                    <div className='flex items-center gap-3 flex-1 min-w-0'>
                      <div className='p-2 rounded bg-red-100 flex-shrink-0'>
                        <FileIcon className='h-4 w-4 text-red-600' />
                      </div>
                      <div className='flex-1 min-w-0'>
                        <p className='text-sm font-medium text-gray-900 truncate'>
                          {file.name}
                        </p>
                        <p className='text-xs text-gray-500'>
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>
                    <Button
                      type='button'
                      variant='ghost'
                      size='sm'
                      onClick={() => removeFile(index)}
                      className='flex-shrink-0 text-red-600 hover:text-red-700 hover:bg-red-50'
                    >
                      <X className='h-4 w-4' />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Card className='border-blue-200 bg-blue-50'>
            <CardContent className='pt-6'>
              <div className='flex items-start gap-3'>
                <Info className='h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0' />
                <div className='flex-1 text-sm text-blue-900'>
                  <p className='font-medium mb-1'>
                    Documentos recomendados:
                  </p>
                  <ul className='list-disc list-inside space-y-1 text-blue-800'>
                    <li>Procuração (se aplicável)</li>
                    <li>Documentos do processo judicial</li>
                    <li>Comprovantes de propriedade</li>
                    <li>Outros documentos relevantes</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
