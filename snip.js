, COLLATERAL_TYPES } from '@/lib/contracts-updated';
import { useI18n } from "@/i18n/I18nContext";
import { useChainId } from 'wagmi';

interface CollateralSelectionProps {
  initialCollateral?: 'CBiomaH'
}

const CollateralSelection = ({ initialCollateral }: CollateralSelectionProps) => {
  const { address, isConnected, chainId: walletChainId } = useAccount();
  const { t } = useI18n();
  const appChainId = useChainId();
  const addresses = CONTRACT_ADDRESSES.sepolia;

  const [selectedCollateral, setSelectedCollateral] = useState<keyof typeof ENVIRONMENTAL_TOKENS>(
    initialCollateral ?? 'CBiomaH'
  );

  // Ensure selection follows initialCollateral even if it becomes available after first render
  useEffect(() => {
    if (initialCollateral && initialCollateral !== selectedCollateral) {
      setSelectedCollateral(initialCollateral);
    }
  }, [initialCollateral]);

  const [depositAmount, setDepositAmount] = useState('');
  const [lockAmount, setLockAmount] = useState('');
  const [unlockAmount, setUnlockAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [mintAmount, setMintAmount] = useState('');
  const [repayAmount, setRepayAmount] = useState('');
  
  // Individual loading states for each operation
  const [isApproving, setIsApproving] = useState(false);
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [isDepositing, setIsDepositing] = useState(false);
  const [isLocking, setIsLocking] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [isRepaying, setIsRepaying] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  // Get current collateral information
  const currentCollateralInfo = ENVIRONMENTAL_TOKENS[selectedCollateral];
  const currentIlkBytes = COLLATERAL_TYPES[selectedCollateral];

  // Read balances directly using useReadContra
