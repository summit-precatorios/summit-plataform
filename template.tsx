mport React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const pixSchema = z.object({
  chave: z.string().min(1, 'Chave Pix é obrigatória'),
});

const bankTransferSchema = z.object({
  banco: z.string().min(1, 'Banco é obrigatório'),
  agencia: z.string().min(1, 'Agência é obrigatória'),
  conta: z.string().min(1, 'Conta é obrigatória'),
});

const getSchema = (method) => {
  if (method === 'pix') return pixSchema;
  if (method === 'bankTransfer') return bankTransferSchema;
  return z.object({});
};

const DynamicForm = () => {
  const [paymentMethod, setPaymentMethod] = useState('pix');

  const { control, handleSubmit, setValue, getValues } = useForm({
    resolver: zodResolver(getSchema(paymentMethod)),
    defaultValues: {
      pix: { chave: '' },
      bankTransfer: { banco: '', agencia: '', conta: '' },
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const handlePaymentMethodChange = (event) => {
    const selectedMethod = event.target.value;
    const currentValues = getValues();

    setValue('pix', currentValues.pix);
    setValue('bankTransfer', currentValues.bankTransfer);

    setPaymentMethod(selectedMethod);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Método de Pagamento:
        <select value={paymentMethod} onChange={handlePaymentMethodChange}>
          <option value="pix">Pix</option>
          <option value="bankTransfer">Transferência Bancária</option>
        </select>
      </label>

      {paymentMethod === 'pix' && (
        <Controller
          name="pix.chave"
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <label>
                Chave Pix:
                <input type="text" {...field} />
              </label>
              {fieldState.error && <p>{fieldState.error.message}</p>}
            </div>
          )}
        />
      )}

      {paymentMethod === 'bankTransfer' && (
        <>
          <Controller
            name="bankTransfer.banco"
            control={control}
            render={({ field, fieldState }) => (
              <div>
                <label>
                  Banco:
                  <input type="text" {...field} />
                </label>
                {fieldState.error && <p>{fieldState.error.message}</p>}
              </div>
            )}
          />
          <Controller
            name="bankTransfer.agencia"
            control={control}
            render={({ field, fieldState }) => (
              <div>
                <label>
                  Agência:
                  <input type="text" {...field} />
                </label>
                {fieldState.error && <p>{fieldState.error.message}</p>}
              </div>
            )}
          />
          <Controller
            name="bankTransfer.conta"
            control={control}
            render={({ field, fieldState }) => (
              <div>
                <label>
                  Conta:
                  <input type="text" {...field} />
                </label>
                {fieldState.error && <p>{fieldState.error.message}</p>}
              </div>
            )}
          />
        </>
      )}

      <button type="submit">Enviar</button>
    </form>
  );
};

export default DynamicForm;