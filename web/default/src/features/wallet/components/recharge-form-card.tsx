/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import { ExternalLink, Gift, Loader2, Receipt } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { TitledCard } from '@/components/ui/titled-card'
import type { TopupInfo } from '../types'

interface RechargeFormCardProps {
  topupInfo: TopupInfo | null
  redemptionCode: string
  onRedemptionCodeChange: (code: string) => void
  onRedeem: () => void
  redeeming: boolean
  topupLink?: string
  loading?: boolean
  onOpenBilling?: () => void
}

export function RechargeFormCard({
  topupInfo,
  redemptionCode,
  onRedemptionCodeChange,
  onRedeem,
  redeeming,
  topupLink,
  loading,
  onOpenBilling,
}: RechargeFormCardProps) {
  const { t } = useTranslation()
  const redemptionEnabled = topupInfo?.enable_redemption !== false

  if (loading) {
    return (
      <Card className='gap-0 overflow-hidden py-0'>
        <CardHeader className='border-b p-3 !pb-3 sm:p-5 sm:!pb-5'>
          <Skeleton className='h-6 w-32' />
          <Skeleton className='mt-2 h-4 w-48' />
        </CardHeader>
        <CardContent className='space-y-4 p-3 sm:p-5'>
          <Skeleton className='h-11 w-full rounded-lg sm:w-56' />
          <div className='flex gap-2'>
            <Skeleton className='h-10 flex-1' />
            <Skeleton className='h-10 w-20' />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <TitledCard
      title={t('Have a Code?')}
      description={t('Enter your redemption code')}
      icon={<Gift className='h-4 w-4' />}
      action={
        onOpenBilling ? (
          <Button
            variant='outline'
            size='sm'
            onClick={onOpenBilling}
            className='w-full gap-2 sm:w-auto'
          >
            <Receipt className='h-4 w-4' />
            {t('Order History')}
          </Button>
        ) : null
      }
      contentClassName='space-y-4 sm:space-y-5'
    >
      {redemptionEnabled ? (
        <>
          {topupLink && (
            <Button
              className='h-11 w-full justify-between gap-3 rounded-lg px-4 sm:w-auto sm:min-w-56'
              render={
                <a href={topupLink} target='_blank' rel='noopener noreferrer' />
              }
            >
              <span>{t('Buy redemption code')}</span>
              <ExternalLink className='h-4 w-4' />
            </Button>
          )}

          <div className='space-y-2.5 sm:space-y-3'>
            <div className='flex items-center gap-2'>
              <Gift className='text-muted-foreground h-4 w-4' />
              <Label
                htmlFor='redemption-code'
                className='text-muted-foreground text-xs font-medium tracking-wider uppercase'
              >
                {t('Have a Code?')}
              </Label>
            </div>
            <div className='grid grid-cols-[minmax(0,1fr)_auto] gap-2'>
              <Input
                id='redemption-code'
                value={redemptionCode}
                onChange={(e) => onRedemptionCodeChange(e.target.value)}
                placeholder={t('Enter your redemption code')}
                className='h-10 min-w-0'
              />
              <Button
                onClick={onRedeem}
                disabled={redeeming}
                variant='outline'
                className='h-10 px-4'
              >
                {redeeming && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                {t('Redeem')}
              </Button>
            </div>
          </div>
        </>
      ) : (
        <Alert>
          <AlertDescription>
            {t(
              'Redemption codes are disabled until the administrator confirms compliance terms.'
            )}
          </AlertDescription>
        </Alert>
      )}
    </TitledCard>
  )
}
